/* eslint-disable @typescript-eslint/no-explicit-any */
import { BetterAuthClientOptions, Auth } from 'better-auth';
import { AuthClient } from 'better-auth/client';
import { ExtendedBetterAuthOptions } from '../interfaces/auth-options.interface.js';

import {
  BasicConfigCategory,
  EmailConfigCategory,
  AuthConfigCategory,
  UserConfigCategory,
  SessionConfigCategory,
  DatabaseConfigCategory,
  PluginConfigCategory,
  ExperimentalConfigCategory,
} from './categories/index.js';

/**
 * Better Auth Builder interface
 * Provides access to configuration categories and build methods
 *
 * @deprecated Use direct betterAuth configuration instead.
 *
 * Configuration is organized into categories:
 * - basic: baseURL, basePath, secret, appName, trustedOrigins, logger, advanced, rateLimit
 * - email: emailAndPassword, emailVerification
 * - auth: socialProviders, hooks
 * - user: user, account
 * - session: session
 * - database: database
 * - plugin: plugins
 */
export interface IBetterAuthBuilder<TPlugins extends any[] = []> {
  readonly basic: BasicConfigCategory<IBetterAuthBuilder<TPlugins>>;
  readonly email: EmailConfigCategory<IBetterAuthBuilder<TPlugins>>;
  readonly auth: AuthConfigCategory<IBetterAuthBuilder<TPlugins>>;
  readonly user: UserConfigCategory<IBetterAuthBuilder<TPlugins>>;
  readonly session: SessionConfigCategory<IBetterAuthBuilder<TPlugins>>;
  readonly database: DatabaseConfigCategory<IBetterAuthBuilder<TPlugins>>;
  readonly plugin: PluginConfigCategory<IBetterAuthBuilder<TPlugins>>;
  readonly experimental: ExperimentalConfigCategory<
    IBetterAuthBuilder<TPlugins>
  >;

  // Special plugin methods for type-safe plugin addition
  withPlugin<TPlugin>(
    plugin: TPlugin,
  ): IBetterAuthBuilder<[...TPlugins, TPlugin]>;
  withPlugins<TNewPlugins extends any[]>(
    plugins: TNewPlugins,
  ): IBetterAuthBuilder<[...TPlugins, ...TNewPlugins]>;

  buildServer(): Auth<
    ExtendedBetterAuthOptions & {
      plugins: TPlugins;
    }
  >;
  buildClient(): AuthClient<
    BetterAuthClientOptions & {
      plugins: TPlugins;
    }
  >;
}

/**
 * Better Auth Client interface (type alias)
 */
export type IBetterAuthClient<TPlugins extends any[] = []> = AuthClient<
  BetterAuthClientOptions & {
    plugins: TPlugins;
  }
>;

/**
 * Better Auth Server type (type alias)
 */
export type BetterAuthServer<TPlugins extends any[] = []> = Auth<
  ExtendedBetterAuthOptions & {
    plugins: TPlugins;
  }
>;
