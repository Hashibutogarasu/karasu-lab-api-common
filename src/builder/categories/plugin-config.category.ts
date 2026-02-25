/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractConfigCategory } from './abstract-config.category.js';

/**
 * Plugin configuration category
 * Handles: plugins
 */
export class PluginConfigCategory<TBuilder> extends AbstractConfigCategory<TBuilder> {
  private plugins: any[] = [];

  addPlugin(plugin: any): TBuilder {
    this.plugins.push(plugin);
    return this.builder;
  }

  addPlugins(plugins: any[]): TBuilder {
    this.plugins = [...this.plugins, ...plugins];
    return this.builder;
  }

  getPlugins(): any[] {
    return this.plugins;
  }
}
