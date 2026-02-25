import { Environment, EnvironmentUtils } from '../environment.js';
import { IAuthClientConfig, IAuthConfigBuilder } from '../interfaces/auth-config.interface.js';

/**
 * Abstract base class for auth client configuration
 * Implements builder pattern for fluent configuration
 */
abstract class AbstractAuthClientConfig implements IAuthConfigBuilder {
  protected _trustedOrigins: string[] = [];
  protected _cookieDomain: string = '';
  protected _baseUrl: string = '';
  protected _basePath: string = '/api/auth';

  constructor() {
    this.setDefaults();
  }

  /**
   * Set environment-specific defaults
   * Override in subclasses to provide different defaults
   */
  protected abstract setDefaults(): void;

  withTrustedOrigins(origins: string[]): this {
    this._trustedOrigins = origins;
    return this;
  }

  withCookieDomain(domain: string): this {
    this._cookieDomain = domain;
    return this;
  }

  withBaseUrl(url: string): this {
    this._baseUrl = url;
    return this;
  }

  withBasePath(path: string): this {
    this._basePath = path;
    return this;
  }

  build(): IAuthClientConfig {
    return {
      trustedOrigins: [...this._trustedOrigins],
      cookieDomain: this._cookieDomain,
      baseUrl: this._baseUrl,
      basePath: this._basePath,
    };
  }
}

/**
 * Production environment auth client configuration
 */
export class ProductionAuthClientConfig extends AbstractAuthClientConfig {
  protected setDefaults(): void {
    this._trustedOrigins = [
      'https://sso.karasu256.com',
      'https://www.karasu256.com',
      'https://karasu256.com',
    ];
    this._cookieDomain = '.karasu256.com';
    this._baseUrl = 'https://api.karasu256.com';
    this._basePath = '/api/auth';
  }
}

/**
 * Development environment auth client configuration
 */
export class DevelopmentAuthClientConfig extends AbstractAuthClientConfig {
  protected setDefaults(): void {
    this._trustedOrigins = [
      'http://localhost:3000',
      'https://sso.karasu256.com',
      'https://www.karasu256.com',
      'https://karasu256.com',
    ];
    this._cookieDomain = 'localhost';
    this._baseUrl = 'http://localhost:3001';
    this._basePath = '/api/auth';
  }
}

/**
 * Test environment auth client configuration
 */
export class TestAuthClientConfig extends AbstractAuthClientConfig {
  protected setDefaults(): void {
    this._trustedOrigins = ['http://localhost:3000'];
    this._cookieDomain = 'localhost';
    this._baseUrl = 'http://localhost:3001';
    this._basePath = '/api/auth';
  }
}

/**
 * Factory function to create auth client config builder based on environment
 * @param environment Environment string (development, production, test)
 * @returns Auth config builder instance for the specified environment
 */
export function createAuthClientConfig(environment: string | Environment): IAuthConfigBuilder {
  if (EnvironmentUtils.isProduction(environment)) {
    return new ProductionAuthClientConfig();
  }

  if (EnvironmentUtils.isTest(environment)) {
    return new TestAuthClientConfig();
  }

  return new DevelopmentAuthClientConfig();
}
