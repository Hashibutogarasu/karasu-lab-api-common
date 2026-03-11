import { BetterAuthOptions } from 'better-auth';

/**
 * Extended BetterAuthOptions to support additional properties
 * like cookieCache and experimental.joins
 */
export interface ExtendedBetterAuthOptions extends BetterAuthOptions {
  cookieCache?: {
    enabled?: boolean;
    maxAge?: number;
    strategy?: 'jwe';
  };
  experimental?: {
    joins?: boolean;
  };
}
