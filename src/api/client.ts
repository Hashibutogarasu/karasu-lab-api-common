import createClient from 'openapi-fetch';

import type { paths } from './schema.js';

/**
 * Client-side API client for the Blog API.
 * Uses the Next.js /api rewrite to proxy requests to the NestJS backend.
 * Credentials are included for cookie-based authentication.
 */
export const apiClient = createClient<paths>({
  baseUrl: '/api',
  credentials: 'include',
});
