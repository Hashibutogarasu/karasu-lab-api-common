/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BetterAuthPlugin } from 'better-auth';
import { createAuthEndpoint, AuthEndpoint } from 'better-auth/api';
import z from 'zod/v4';

/**
 * Plugin endpoint configuration
 */
export interface PluginEndpointConfig<
  TBody = any,
  TResponse = any,
  TMethod extends 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH',
> {
  path: string;
  method: TMethod;
  bodySchema?: z.ZodType<TBody>;
  handler: (body: TBody) => Promise<TResponse> | TResponse;
}

type InferServerEndpoint<TConfig extends PluginEndpointConfig> = AuthEndpoint<
  string, // since PluginEndpointConfig path is just string
  {
    method: [TConfig['method']];
    // body type is derived from the bodySchema if it exists
    body: TConfig['bodySchema'] extends z.ZodType<infer B>
      ? z.ZodType<B>
      : undefined;
  },
  TConfig['handler'] extends (body: any) => Promise<infer R> | infer R ? R : any
>;

/**
 * Infer client action types from endpoint configurations
 * Better-auth client wraps responses in { data, error } format
 */
type InferEndpointActions<
  TEndpoints extends Record<string, PluginEndpointConfig>,
> = {
  [K in keyof TEndpoints]: TEndpoints[K] extends PluginEndpointConfig<
    infer TBody,
    infer TResponse
  >
    ? (data: TBody) => Promise<{ data: TResponse; error: Error | null }>
    : never;
};

/**
 * Client plugin type with properly typed actions
 */
type ClientPlugin<
  TId extends string,
  TEndpoints extends Record<string, PluginEndpointConfig>,
> = {
  id: TId;
  $InferServerPlugin: BetterAuthPlugin;
  getActions: ($fetch: any) => InferEndpointActions<TEndpoints>;
};

/**
 * Plugin Builder for creating type-safe server and client plugins
 */
export class PluginBuilder<
  TId extends string,
  TEndpoints extends Record<string, PluginEndpointConfig> = {},
> {
  private pluginId: TId;
  private endpoints: TEndpoints;

  private constructor(id: TId, endpoints: TEndpoints) {
    this.pluginId = id;
    this.endpoints = endpoints;
  }

  /**
   * Create a new plugin builder
   */
  static create<TId extends string>(id: TId): PluginBuilder<TId, {}> {
    return new PluginBuilder<TId, {}>(id, {} as {});
  }

  /**
   * Add an endpoint to the plugin
   */
  withEndpoint<
    TName extends string,
    TBody = any,
    TResponse = any,
    TMethod extends 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' =
      | 'GET'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'PATCH',
  >(
    name: TName,
    config: PluginEndpointConfig<TBody, TResponse, TMethod>,
  ): PluginBuilder<
    TId,
    TEndpoints & Record<TName, PluginEndpointConfig<TBody, TResponse, TMethod>>
  > {
    const newEndpoints = {
      ...this.endpoints,
      [name]: config,
    } as TEndpoints &
      Record<TName, PluginEndpointConfig<TBody, TResponse, TMethod>>;

    return new PluginBuilder<TId, any>(this.pluginId, newEndpoints);
  }

  /**
   * Build server-side plugin
   */
  buildServer(): BetterAuthPlugin & {
    id: TId;
    endpoints: {
      [K in keyof TEndpoints]: InferServerEndpoint<TEndpoints[K]>;
    };
  } {
    const serverEndpoints: Record<string, any> = {};

    for (const [name, config] of Object.entries(this.endpoints)) {
      const endpoint = config as PluginEndpointConfig;

      // Build endpoint options based on method and body
      const endpointOptions: any = {
        method: endpoint.method,
      };

      // Only add body for methods that support it
      if (endpoint.bodySchema && endpoint.method !== 'GET') {
        endpointOptions.body = endpoint.bodySchema;
      }

      serverEndpoints[name] = createAuthEndpoint(
        endpoint.path,
        endpointOptions,
        async (ctx) => {
          return await endpoint.handler(ctx.body);
        },
      );
    }

    return {
      id: this.pluginId,
      endpoints: serverEndpoints,
    } as any;
  }

  /**
   * Build client-side plugin
   */
  buildClient(): ClientPlugin<TId, TEndpoints> {
    return {
      id: this.pluginId,
      $InferServerPlugin: {} as ReturnType<typeof this.buildServer>,
      getActions: ($fetch: any) => {
        const actions: Record<string, any> = {};

        for (const [name, config] of Object.entries(this.endpoints)) {
          const endpoint = config as PluginEndpointConfig;

          actions[name] = async (data: any) => {
            return await $fetch(endpoint.path, {
              method: endpoint.method,
              body: data,
            });
          };
        }

        return actions as InferEndpointActions<TEndpoints>;
      },
    };
  }

  /**
   * Build both server and client plugins
   */
  build() {
    return {
      server: this.buildServer(),
      client: this.buildClient(),
    };
  }
}

/**
 * Helper function to create a plugin builder
 */
export function createPlugin<TId extends string>(id: TId) {
  return PluginBuilder.create(id);
}
