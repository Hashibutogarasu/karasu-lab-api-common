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
    const builder = BetterAuthBuilder.create()
      .withPlugin(testServerPlugin())
      .withPlugin(testClientPlugin());

    builder.basic.setBaseURL('http://localhost:3001');
    builder.basic.setBasePath('/api/auth');
    builder.basic.setSecret('test-secret-key');

    const server = builder.buildServer();

    vi.stubGlobal(
      'fetch',
      async (url: RequestInfo | URL, options?: RequestInit) => {
        const request = new Request(url, options);
        const response = await server.handler(request);
        return response;
      },
    );

    const client = builder.buildClient();

    expect(server).toBeDefined();
    expect(server.handler).toBeDefined();

    expect(client).toBeDefined();
    expectTypeOf(client).toHaveProperty('testMethod');

    expect(typeof client.testMethod).toBe('function');
    expectTypeOf(client.testMethod).toBeFunction();
    expectTypeOf(client.testMethod)
      .parameter(0)
      .toEqualTypeOf<{ message: string }>();

    const response1 = await client.testMethod({
      message: 'Hello from client',
    });

    expect(response1).toBeDefined();
    expect(response1.error).toBeNull();
    expect(response1.data).toBeDefined();
    expect(response1.data.success).toBe(true);
    expect(response1.data.receivedMessage).toBe('Hello from client');
    expect(response1.data.calledDirectly).toBe(true);
    expect(response1.data.serverCallCount).toBe(1);

    const response2 = await client.testMethod({
      message: 'Hello again',
    });

    expect(response2.error).toBeNull();
    expect(response2.data.serverCallCount).toBe(2);
  });

  it('should correctly set ipAddressHeaders, cookieCache, and experimental.joins', () => {
    const builder = BetterAuthBuilder.create()
      .basic.setIPAddressHeaders(['cf-connecting-ip', 'x-forwarded-for'])
      .basic.setCookieCache({ enabled: true, strategy: 'jwe' })
      .experimental.setJoins(true);

    const builderImpl = builder as unknown as { serverOptions: any };
    const serverOptions = builderImpl.serverOptions;

    expect(serverOptions.advanced?.ipAddress?.ipAddressHeaders).toEqual([
      'cf-connecting-ip',
      'x-forwarded-for',
    ]);
    expect(serverOptions.cookieCache).toEqual({
      enabled: true,
      strategy: 'jwe',
    });
    expect(serverOptions.experimental?.joins).toBe(true);
  });

  afterEach(() => {});
});
