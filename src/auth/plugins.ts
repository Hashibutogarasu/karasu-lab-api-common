import { BetterAuthClientPlugin } from 'better-auth';

import {
  oauthApplicationPluginInterface,
  passwordPluginInterface,
} from '../index.js';

export interface CustomClientPlugin<T extends { id: string }>
  extends BetterAuthClientPlugin {
  id: T['id'];
  $InferServerPlugin: T;
}

const createClientPlugin = <T extends { id: string }>(
  plugin: T,
): CustomClientPlugin<T> => {
  return {
    id: plugin.id,
    $InferServerPlugin: {} as T,
  };
};

/**
 * Password client-side plugin.
 */
export const passwordClient = (): CustomClientPlugin<
  ReturnType<typeof passwordPluginInterface>
> => createClientPlugin(passwordPluginInterface());

/**
 * OAuth Application client-side plugin.
 */
export const oauthApplicationClient = (): CustomClientPlugin<
  ReturnType<typeof oauthApplicationPluginInterface>
> => createClientPlugin(oauthApplicationPluginInterface());
