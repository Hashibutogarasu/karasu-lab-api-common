import { BetterAuthOptions } from 'better-auth';

import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * User and account configuration category
 * Handles: user, account
 */
export class UserConfigCategory<TBuilder> extends AbstractConfigCategory<TBuilder> {
  setUser(user: BetterAuthOptions['user']): TBuilder {
    this.serverOptions.user = user;
    return this.builder;
  }

  setAccount(account: BetterAuthOptions['account']): TBuilder {
    this.serverOptions.account = account;
    return this.builder;
  }
}
