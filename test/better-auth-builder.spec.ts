import {
  describe,
  it,
  beforeAll,
  afterEach,
  expectTypeOf,
  expect,
  vi,
  beforeEach,
} from 'vitest';

import {
  BetterAuthBuilder,
  IBetterAuthBuilder,
  BetterAuthServer,
  IBetterAuthClient,
} from '../src/builder/better-auth-builder';

import { testClientPlugin, testServerPlugin } from './test-plugin';

/**
 * Better Auth builder pattern can set a values likes
 * - baseURL
 * - basePath
 * - advanced
 * - trustedOrigins
 * - logger
 * - appName
 * - secret
 * - socialProviders
 * - emailAndPassword
 * - emailVerification
 * - hooks
 * - plugins
 * - user
 * - account
 * - database
 * - session
 */
describe('test builder base better-auth', () => {
  beforeAll(() => {});

  beforeEach(() => {});

  it('builder is IBetterAuthBuilder', () => {
    const builder = BetterAuthBuilder.create();
    expect(builder).toBeInstanceOf(BetterAuthBuilder);
    expectTypeOf(builder).toMatchTypeOf<IBetterAuthBuilder>();
  });

  it('built IBetterAuthBuilder will be BetterAuthServer', () => {
    const builder = BetterAuthBuilder.create();
    const server = builder.buildServer();
    expectTypeOf(server).toMatchTypeOf<BetterAuthServer>();
  });

  it('BetterAuthServer can be built from static method', () => {
    const server = BetterAuthBuilder.buildServer();
    expectTypeOf(server).toMatchTypeOf<BetterAuthServer>();
  });

  it('BetterAuthClient will be IBetterAuthClient', () => {
    const builder = BetterAuthBuilder.create();
    const client = builder.buildClient();
    expectTypeOf(client).toMatchTypeOf<IBetterAuthClient>();
  });

  it('client will request from common server interface', async () => {
    // ========================================
    // Test 1: Build both server and client from the same builder
    // This ensures type-safe plugin sharing between server and client
    // ========================================
    // Add plugins first for type inference
    const builder = BetterAuthBuilder.create()
      .withPlugin(testServerPlugin())
      .withPlugin(testClientPlugin());

    // Then configure categories
    builder.basic.setBaseURL('http://localhost:3001');
    builder.basic.setBasePath('/api/auth');
    builder.basic.setSecret('test-secret-key');

    // Build server from the builder
    const server = builder.buildServer();

    // ========================================
    // Test 2: Mock fetch to forward client requests to server handler
    // ========================================
    // This allows client to send requests that are handled by the server
    vi.stubGlobal(
      'fetch',
      async (url: RequestInfo | URL, options?: RequestInit) => {
        const request = new Request(url, options);
        const response = await server.handler(request);
        return response;
      },
    );

    // Build client from the same builder (shares plugin type information)
    const client = builder.buildClient();

    // ========================================
    // Test 3: Verify server is defined
    // ========================================
    expect(server).toBeDefined();
    expect(server.handler).toBeDefined();

    // ========================================
    // Test 4: Verify client has type-safe plugin methods
    // ========================================
    expect(client).toBeDefined();
    // Client should have testMethod available (type-safe)
    expectTypeOf(client).toHaveProperty('testMethod');

    // ========================================
    // Test 5: Verify type-safe client method signature
    // ========================================
    // Client method should be properly typed based on plugin definition
    expect(typeof client.testMethod).toBe('function');
    expectTypeOf(client.testMethod).toBeFunction();
    expectTypeOf(client.testMethod)
      .parameter(0)
      .toEqualTypeOf<{ message: string }>();

    // ========================================
    // Test 6: Client sends request through HTTP (via mocked fetch)
    // ========================================
    // Requests must go through buildClient(), not server.api directly
    const response1 = await client.testMethod({
      message: 'Hello from client',
    });

    // Better-auth client wraps responses in { data, error } format
    expect(response1).toBeDefined();
    expect(response1.error).toBeNull();
    expect(response1.data).toBeDefined();
    expect(response1.data.success).toBe(true);
    expect(response1.data.receivedMessage).toBe('Hello from client');
    expect(response1.data.calledDirectly).toBe(true);
    expect(response1.data.serverCallCount).toBe(1);

    // Call again to verify counter increment (proves server code executes)
    const response2 = await client.testMethod({
      message: 'Hello again',
    });

    expect(response2.error).toBeNull();
    expect(response2.data.serverCallCount).toBe(2);

    // ========================================
    // Key pattern demonstrated:
    // - Server provides handler for HTTP requests (server.handler)
    // - Client provides type-safe methods for making requests (client.testMethod)
    // - Requests must go through client, not server.api directly
    // - Both built from same builder, ensuring type consistency
    // ========================================
  });

  afterEach(() => {});
});
