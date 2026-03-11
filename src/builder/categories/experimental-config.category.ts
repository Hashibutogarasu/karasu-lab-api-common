import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * Experimental configuration category
 * Handles: experimental options
 */
export class ExperimentalConfigCategory<
  TBuilder,
> extends AbstractConfigCategory<TBuilder> {
  /**
   * Enable database joins for better performance
   */
  setJoins(enabled: boolean): TBuilder {
    this.serverOptions.experimental = {
      ...this.serverOptions.experimental,
      joins: enabled,
    };
    return this.builder;
  }
}
