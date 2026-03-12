'use client';

import React, { createContext, useContext, useMemo } from 'react';

import {
  createPlatformAuthClient,
  type PlatformAuthClient,
} from '../auth/client.js';

/**
 * Context for the platform auth client.
 */
const AuthContext = createContext<PlatformAuthClient | null>(null);

/**
 * Hook to use the platform auth client.
 * @returns The platform auth client instance.
 */
export function useAuthClient(): PlatformAuthClient {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthClient must be used within an AuthLayout');
  }
  return context;
}

/**
 * Props for the AuthLayout component.
 */
export interface AuthLayoutProps {
  /**
   * The host URL for session/cookie synchronization.
   */
  host: string;
  /**
   * The auth client instance.
   */
  authClient: PlatformAuthClient;
  /**
   * Children components.
   */
  children: React.ReactNode;
}

/**
 * AuthLayout component that handles session and cookie synchronization.
 * This component does not provide any UI.
 * @param props The component props.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  host,
  authClient: initialClient,
  children,
}) => {
  /**
   * Memoized auth client with host configuration.
   * If a host is provided, we recreate the client to point to that host.
   * Session state is synchronized via better-auth's global broadcast channel.
   */
  const authClient = useMemo(() => {
    if (host) {
      return createPlatformAuthClient(host);
    }
    return initialClient;
  }, [host, initialClient]);

  return (
    <AuthContext.Provider value={authClient}>{children}</AuthContext.Provider>
  );
};
