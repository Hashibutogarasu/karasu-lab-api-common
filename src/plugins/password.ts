import {
  createAuthEndpoint,
  sessionMiddleware,
  APIError,
} from 'better-auth/api';
import z4 from 'zod/v4';

export const passwordPluginInterface = () => {
  return {
    id: 'password',
    endpoints: {
      verify: createAuthEndpoint(
        '/password/verify',
        {
          method: 'POST',
          use: [sessionMiddleware],
          body: z4.object({
            password: z4.string().min(1),
          }),
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      set: createAuthEndpoint(
        '/password/set',
        {
          method: 'POST',
          use: [sessionMiddleware],
          body: z4.object({
            newPassword: z4.string().min(8),
          }),
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
    },
  };
};
