import {
  createAuthEndpoint,
  sessionMiddleware,
  APIError,
} from 'better-auth/api';
import z4 from 'zod/v4';

export const passkeyPluginInterface = () => {
  return {
    id: 'passkey',
    endpoints: {
      generateRegisterOptions: createAuthEndpoint(
        '/passkey/generate-register-options',
        {
          method: 'GET',
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      verifyRegistration: createAuthEndpoint(
        '/passkey/verify-registration',
        {
          method: 'POST',
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      generateAuthenticateOptions: createAuthEndpoint(
        '/passkey/generate-authenticate-options',
        {
          method: 'GET',
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      verifyAuthentication: createAuthEndpoint(
        '/passkey/verify-authentication',
        {
          method: 'POST',
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      listUserPasskeys: createAuthEndpoint(
        '/passkey/list',
        {
          method: 'GET',
          use: [sessionMiddleware],
        },
        async () => {
          throw new APIError('NOT_IMPLEMENTED');
        },
      ),
      deletePasskey: createAuthEndpoint(
        '/passkey/delete',
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
