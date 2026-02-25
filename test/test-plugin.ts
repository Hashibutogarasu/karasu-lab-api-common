import z from 'zod/v4';

import { createPlugin } from '../src/builder/plugin-builder';

/**
 * Track server-side calls
 */
let serverCallCount = 0;

/**
 * Test plugin using PluginBuilder
 * Demonstrates type-safe server/client plugin creation
 */
const testPlugin = createPlugin('test-plugin').withEndpoint('testMethod', {
  path: '/test/method',
  method: 'POST',
  bodySchema: z.object({
    message: z.string(),
  }),
  handler: async (body: { message: string }) => {
    serverCallCount++;
    return {
      success: true,
      receivedMessage: body.message,
      serverCallCount,
      calledDirectly: true,
    };
  },
});

/**
 * Build both server and client plugins
 */
const { server: testServerPluginDef, client: testClientPluginDef } =
  testPlugin.build();

/**
 * Export server plugin
 */
export const testServerPlugin = () => testServerPluginDef;

/**
 * Export client plugin
 */
export const testClientPlugin = () => testClientPluginDef;

/**
 * Reset server call count (for testing)
 */
export const resetServerCallCount = () => {
  serverCallCount = 0;
};

/**
 * Get server call count (for testing)
 */
export const getServerCallCount = () => serverCallCount;
