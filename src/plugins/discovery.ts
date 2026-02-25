import {
  createAuthEndpoint,
  APIError,
} from 'better-auth/api';

/**
 * Discovery plugin interface for frontend
 * Provides information about available authentication methods
 */
export const discoveryPluginInterface = () => {
  return {
    id: 'discovery',
    endpoints: {
      getDiscovery: createAuthEndpoint(
        '/discovery',
        {
          method: 'GET',
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
    },
  };
};

/**
 * Discovery response type
 */
export interface DiscoveryResponse {
  providers: Array<{
    id: string;
    enabled: boolean;
  }>;
  emailAndPassword: boolean;
  passkey: boolean;
  twoFactor: boolean;
  organization: boolean;
}
