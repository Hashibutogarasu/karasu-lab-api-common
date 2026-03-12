import { BetterAuthClientPlugin } from 'better-auth';

/**
 * Plugin for Next.js to handle cookie forwarding during SSR.
 */
export const nextCookiesRequestPlugin = () => {
  return {
    id: 'next-cookies-request',
    fetchPlugins: [
      {
        id: 'next-cookies-request-plugin',
        name: 'next-cookies-request-plugin',
        hooks: {
          async onRequest(ctx) {
            if (typeof window === 'undefined') {
              try {
                // @ts-expect-error: Next.js specific dynamic import
                const { headers } = await import('next/headers');
                const h = await headers();
                const cookie = h.get('cookie');
                if (cookie) {
                  ctx.headers.set('cookie', cookie);
                }
              } catch {
                // Fallback if next/headers is not available
              }
            }
          },
        },
      },
    ],
  } satisfies BetterAuthClientPlugin;
};
