import { BetterAuthOptions } from 'better-auth';

import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * Database configuration category
 * Handles: database
 */
export class DatabaseConfigCategory<TBuilder> extends AbstractConfigCategory<TBuilder> {
  setDatabase(database: BetterAuthOptions['database']): TBuilder {
    this.serverOptions.database = database;
    return this.builder;
  }
}
