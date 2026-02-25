import { BetterAuthOptions } from 'better-auth';

import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * Authentication configuration category
 * Handles: socialProviders, hooks
 */
export class AuthConfigCategory<TBuilder> extends AbstractConfigCategory<TBuilder> {
  setSocialProviders(providers: BetterAuthOptions['socialProviders']): TBuilder {
    this.serverOptions.socialProviders = providers;
    return this.builder;
  }

  setSocialProvider(
    id: string,
    config: { clientId: string; clientSecret: string },
  ): TBuilder {
    if (!this.serverOptions.socialProviders) {
      this.serverOptions.socialProviders = {};
    }
    // Use type assertion to handle dynamic key assignment
    (
      this.serverOptions.socialProviders as Record<
        string,
        { clientId: string; clientSecret: string }
      >
    )[id] = config;
    return this.builder;
  }

  setHooks(hooks: BetterAuthOptions['hooks']): TBuilder {
    this.serverOptions.hooks = hooks;
    return this.builder;
  }
}
