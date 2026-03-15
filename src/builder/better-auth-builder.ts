/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterAuth, BetterAuthClientOptions, Auth } from 'better-auth';
import { createAuthClient, AuthClient } from 'better-auth/client';
import { ExtendedBetterAuthOptions } from '../interfaces/auth-options.interface.js';

import {
  IBetterAuthBuilder,
  IBetterAuthClient,
  BetterAuthServer,
} from './better-auth-builder.interface.js';
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

// Re-export types from interface file
export type { IBetterAuthBuilder, IBetterAuthClient, BetterAuthServer };

/**
 * Better Auth Builder implementation
 * Uses Dependency Injection and Polymorphism to organize configuration
 * Each category handles its own configuration logic
 *
 * @deprecated Use direct betterAuth configuration instead.
 */
export class BetterAuthBuilder<TPlugins extends any[] = []>
  implements IBetterAuthBuilder<TPlugins>
{
  public serverOptions: Partial<ExtendedBetterAuthOptions> = {};
  public clientOptions: Partial<BetterAuthClientOptions> = {};

  // Configuration categories (public for direct access)
  public readonly basic: BasicConfigCategory<this>;
  public readonly email: EmailConfigCategory<this>;
  public readonly auth: AuthConfigCategory<this>;
  public readonly user: UserConfigCategory<this>;
  public readonly session: SessionConfigCategory<this>;
  public readonly database: DatabaseConfigCategory<this>;
  public readonly plugin: PluginConfigCategory<this>;
  public readonly experimental: ExperimentalConfigCategory<this>;

  private constructor() {
    // Initialize all configuration categories with shared options
    this.basic = new BasicConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
    this.email = new EmailConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
    this.auth = new AuthConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
    this.user = new UserConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
    this.session = new SessionConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
    this.database = new DatabaseConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
    this.plugin = new PluginConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
    this.experimental = new ExperimentalConfigCategory(
      this.serverOptions,
      this.clientOptions,
      this,
    );
  }

  /**
   * Create a new builder instance
   */
  static create(): BetterAuthBuilder<[]> {
    return new BetterAuthBuilder<[]>();
  }

  /**
   * Static method to directly build server instance with default config
   */
  static buildServer(): BetterAuthServer<[]> {
    return new BetterAuthBuilder<[]>().buildServer();
  }

  /**
   * Add a plugin to the builder
   * Special method for type-safe plugin addition
   */
  withPlugin<TPlugin>(
    plugin: TPlugin,
  ): BetterAuthBuilder<[...TPlugins, TPlugin]> {
    this.plugin.addPlugin(plugin);
    return this as any;
  }

  /**
   * Add multiple plugins to the builder
   * Special method for type-safe plugin addition
   */
  withPlugins<TNewPlugins extends any[]>(
    plugins: TNewPlugins,
  ): BetterAuthBuilder<[...TPlugins, ...TNewPlugins]> {
    this.plugin.addPlugins(plugins);
    return this as any;
  }

  buildServer(): Auth<
    ExtendedBetterAuthOptions & {
      plugins: TPlugins;
    }
  > {
    const options: ExtendedBetterAuthOptions = {
      ...this.serverOptions,
      plugins: [
        ...(this.serverOptions.plugins || []),
        ...this.plugin.getPlugins(),
      ],
    } as ExtendedBetterAuthOptions;

    return betterAuth(options as any) as unknown as Auth<
      ExtendedBetterAuthOptions & {
        plugins: TPlugins;
      }
    >;
  }

  buildClient(): AuthClient<
    BetterAuthClientOptions & {
      plugins: TPlugins;
    }
  > {
    const options: BetterAuthClientOptions = {
      ...this.clientOptions,
      plugins: this.plugin.getPlugins(),
    };

    return createAuthClient(options as any) as unknown as AuthClient<
      BetterAuthClientOptions & {
        plugins: TPlugins;
      }
    >;
  }
}
