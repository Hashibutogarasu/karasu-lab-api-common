/**
 * Client-side auth configuration interface
 * Provides read-only access to auth settings for frontend applications
 */
export interface IAuthClientConfig {
  readonly trustedOrigins: string[];
  readonly cookieDomain: string;
  readonly baseUrl: string;
  readonly basePath: string;
}

/**
 * Builder interface for constructing auth client configurations
 * Allows fluent API for setting configuration values
 */
export interface IAuthConfigBuilder {
  withTrustedOrigins(origins: string[]): this;
  withCookieDomain(domain: string): this;
  withBaseUrl(url: string): this;
  withBasePath(path: string): this;
  build(): IAuthClientConfig;
}
