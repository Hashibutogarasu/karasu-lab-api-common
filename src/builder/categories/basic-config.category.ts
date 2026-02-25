import { BetterAuthOptions } from 'better-auth';

import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * Basic configuration category
 * Handles: baseURL, basePath, secret, appName, trustedOrigins, logger, advanced, rateLimit
 */
export class BasicConfigCategory<
  TBuilder,
> extends AbstractConfigCategory<TBuilder> {
  setBaseURL(baseURL: string): TBuilder {
    this.serverOptions.baseURL = baseURL;
    this.clientOptions.baseURL = baseURL;
    return this.builder;
  }

  setBasePath(basePath: string): TBuilder {
    this.serverOptions.basePath = basePath;
    return this.builder;
  }

  setSecret(secret: string): TBuilder {
    this.serverOptions.secret = secret;
    return this.builder;
  }

  setAppName(name: string): TBuilder {
    this.serverOptions.appName = name;
    return this.builder;
  }

  setTrustedOrigins(origins: string[]): TBuilder {
    this.serverOptions.trustedOrigins = origins;
    return this.builder;
  }

  setLogger(logger: BetterAuthOptions['logger']): TBuilder {
    this.serverOptions.logger = logger;
    return this.builder;
  }

  setAdvanced(advanced: BetterAuthOptions['advanced']): TBuilder {
    this.serverOptions.advanced = advanced;
    return this.builder;
  }

  setRateLimit(rateLimit: BetterAuthOptions['rateLimit']): TBuilder {
    this.serverOptions.rateLimit = rateLimit;
    return this.builder;
  }
}
