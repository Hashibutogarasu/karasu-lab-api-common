/* eslint-disable import/no-unresolved */
export { throwIfError } from './throw-if-error.js';
export type { BetterAuthError } from './throw-if-error.js';
export { passwordPluginInterface } from './plugins/password.js';
export { oauthApplicationPluginInterface } from './plugins/oauth-application.js';
export { passkeyPluginInterface } from './plugins/passkey.js';
export { discoveryPluginInterface } from './plugins/discovery.js';
export type { DiscoveryResponse } from './plugins/discovery.js';
export * from './interfaces/endpoint.interface.js';
export * from './interfaces/plugin.interface.js';
export * from './interfaces/auth-config.interface.js';
export {
  AbstractEnvironment,
  Environment,
  EnvironmentUtils,
} from './environment.js';
export type { IEnvironment } from './environment.js';
export {
  ProductionAuthClientConfig,
  DevelopmentAuthClientConfig,
  TestAuthClientConfig,
  createAuthClientConfig,
} from './config/auth-client-config.js';
