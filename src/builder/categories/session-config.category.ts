import { BetterAuthOptions } from 'better-auth';

import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * Session configuration category
 * Handles: session
 */
export class SessionConfigCategory<TBuilder> extends AbstractConfigCategory<TBuilder> {
  setSession(session: BetterAuthOptions['session']): TBuilder {
    this.serverOptions.session = session;
    return this.builder;
  }
}
