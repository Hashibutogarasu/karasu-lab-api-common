import { apiKeyClient } from '@better-auth/api-key/client';
import { passkeyClient } from '@better-auth/passkey/client';
import {
  adminClient,
  deviceAuthorizationClient,
  emailOTPClient,
  magicLinkClient,
  oidcClient,
  twoFactorClient,
  usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { nextCookiesRequestPlugin } from './next-cookies-plugin.js';
import { oauthApplicationClient, passwordClient } from './plugins.js';

/**
 * Factory function to creates the platform auth client with standard plugins.
 * Exported to allow naming the inferred return type (portability).
 * @param baseURL The base URL for the auth server.
 * @returns The configured Better Auth client instance.
 */
export function authClientFactory(baseURL: string) {
  return createAuthClient({
    baseURL,
    plugins: [
      passwordClient(),
      oauthApplicationClient(),
      usernameClient(),
      deviceAuthorizationClient(),
      oidcClient(),
      passkeyClient(),
      twoFactorClient(),
      emailOTPClient(),
      magicLinkClient(),
      nextCookiesRequestPlugin(),
      adminClient(),
      apiKeyClient(),
    ],
  });
}

/**
 * Type representing the platform auth client with all plugins.
 * Preserves full type safety for plugin-specific actions and hooks.
 */
export type PlatformAuthClient = ReturnType<typeof authClientFactory>;

/**
 * Type-safe auth client creation function.
 * @param baseURL The base URL for the auth server.
 * @returns The configured Platform Auth client instance.
 */
export function createPlatformAuthClient(baseURL: string): PlatformAuthClient {
  return authClientFactory(baseURL);
}
