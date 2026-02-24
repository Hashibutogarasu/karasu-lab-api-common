export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export interface IEnvironment {
  readonly environment: Environment;
}

export abstract class AbstractEnvironment implements IEnvironment {
  readonly environment: Environment;

  constructor(environment?: Environment | string) {
    this.environment = this.parseEnvironment(
      environment ??
        (typeof process !== 'undefined' ? process.env.NODE_ENV : undefined),
    );
  }

  private parseEnvironment(env?: Environment | string): Environment {
    if (env && Object.values(Environment).includes(env as Environment)) {
      return env as Environment;
    }
    return Environment.DEVELOPMENT;
  }
}

export class EnvironmentUtils {
  static isProduction(env: Environment | string): boolean {
    return (env as Environment) === Environment.PRODUCTION;
  }

  static isDevelopment(env: Environment | string): boolean {
    return (env as Environment) === Environment.DEVELOPMENT;
  }

  static isTest(env: Environment | string): boolean {
    return (env as Environment) === Environment.TEST;
  }
}
