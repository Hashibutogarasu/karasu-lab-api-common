import { BetterAuthOptions } from 'better-auth';

import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * Email configuration category
 * Handles: emailAndPassword, emailVerification
 */
export class EmailConfigCategory<
  TBuilder,
> extends AbstractConfigCategory<TBuilder> {
  setEmailAndPassword(config: BetterAuthOptions['emailAndPassword']): TBuilder {
    this.serverOptions.emailAndPassword = config;
    return this.builder;
  }

  setEmailVerification(
    config: BetterAuthOptions['emailVerification'],
  ): TBuilder {
    this.serverOptions.emailVerification = config;
    return this.builder;
  }
}
