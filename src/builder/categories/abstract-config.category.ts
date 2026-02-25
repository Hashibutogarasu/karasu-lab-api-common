import { BetterAuthOptions, BetterAuthClientOptions } from 'better-auth';

/**
 * Abstract base class for configuration categories
 * Provides shared access to server and client options
 * Each method returns the builder instance for method chaining
 */
export abstract class AbstractConfigCategory<TBuilder> {
  constructor(
    public serverOptions: Partial<BetterAuthOptions>,
    public clientOptions: Partial<BetterAuthClientOptions>,
    protected builder: TBuilder,
  ) {}

  /**
   * Get server options reference
   */
  protected getServerOptions(): Partial<BetterAuthOptions> {
    return this.serverOptions;
  }

  /**
   * Get client options reference
   */
  protected getClientOptions(): Partial<BetterAuthClientOptions> {
    return this.clientOptions;
  }
}
