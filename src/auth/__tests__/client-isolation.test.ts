import { createPlatformAuthClient } from '../client.js';
import { expect, it, describe, vi, beforeEach } from 'vitest';

/**
 * Verification test to ensure that AuthClient instances are truly isolated
 * and do not pollute global state or each other's configuration.
 */
describe('AuthClient Instance Isolation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should target different URLs based on their individual configurations', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            user: {
              id: '1',
              email: 'test@example.com',
              emailVerified: true,
              name: 'Test',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            session: {
              id: '1',
              userId: '1',
              expiresAt: new Date().toISOString(),
              token: 'token',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              userAgent: '',
              ipAddress: '',
            },
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    });

    const host1 = 'https://tenant-1.api.example.com';
    const host2 = 'https://tenant-2.api.example.com';

    const client1 = createPlatformAuthClient(host1);
    const client2 = createPlatformAuthClient(host2);

    expect(client1).not.toBe(client2);

    const getUrlFromCall = (call: unknown[]): string => {
      const input = call[0] as string | URL | Request;
      if (typeof input === 'string') return input;
      if (input instanceof URL) return input.href;
      return (input as Request).url;
    };

    await client1.signIn.email({
      email: 'user@tenant1.com',
      password: 'password',
    });
    const url1 = getUrlFromCall(fetchSpy.mock.calls[0]);
    expect(url1).toContain('tenant-1.api.example.com');
    expect(url1).not.toContain('tenant-2.api.example.com');

    fetchSpy.mockClear();

    await client2.signIn.email({
      email: 'user@tenant2.com',
      password: 'password',
    });
    const url2 = getUrlFromCall(fetchSpy.mock.calls[0]);
    expect(url2).toContain('tenant-2.api.example.com');
    expect(url2).not.toContain('tenant-1.api.example.com');
  });

  it('should maintain isolation even when multiple clients are initialized', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify({}), { status: 200 })),
      );

    const hostA = 'https://host-a.com';
    const clientA = createPlatformAuthClient(hostA);

    createPlatformAuthClient('https://host-b.com');
    createPlatformAuthClient('https://host-c.com');

    await clientA.getSession();
    const input = fetchSpy.mock.calls[0][0] as string | URL | Request;
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : (input as Request).url;

    expect(url).toContain('host-a.com');
    expect(url).not.toContain('host-b.com');
    expect(url).not.toContain('host-c.com');
  });
});
