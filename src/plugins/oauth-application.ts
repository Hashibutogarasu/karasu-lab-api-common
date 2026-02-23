import {
  createAuthEndpoint,
  sessionMiddleware,
  APIError,
} from 'better-auth/api';
import z4 from 'zod/v4';

export const oauthApplicationPluginInterface = () => {
  return {
    id: 'oauthApplications',
    endpoints: {
      all: createAuthEndpoint(
        '/oauth-applications/all',
        {
          method: 'GET',
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      getApp: createAuthEndpoint(
        '/oauth-applications',
        {
          method: 'GET',
          query: z4.object({
            id: z4.string(),
          }),
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      byClientId: createAuthEndpoint(
        '/oauth-applications/by-client-id',
        {
          method: 'GET',
          query: z4.object({
            client_id: z4.string(),
          }),
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      updateDisabled: createAuthEndpoint(
        '/oauth-applications/update-disabled',
        {
          method: 'POST',
          body: z4.object({
            id: z4.string(),
            disabled: z4.boolean(),
          }),
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      update: createAuthEndpoint(
        '/oauth-applications/update',
        {
          method: 'POST',
          body: z4.object({
            id: z4.string(),
            name: z4.string().optional(),
            redirectUris: z4.array(z4.string()).optional(),
            description: z4.string().optional(),
          }),
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      regenerateSecret: createAuthEndpoint(
        '/oauth-applications/regenerate-secret',
        {
          method: 'POST',
          body: z4.object({
            id: z4.string(),
          }),
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      delete: createAuthEndpoint(
        '/oauth-applications/delete',
        {
          method: 'POST',
          body: z4.object({
            id: z4.string(),
          }),
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
    },
  };
};
