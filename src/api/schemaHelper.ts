import { paths } from './schema.js';

/**
 * Represents the available URL paths from the API schema.
 */
export type UrlPaths = keyof paths;

/**
 * Represents the supported HTTP methods.
 */
export type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

/**
 * Internal helper to extract response type from path and method.
 */
type OperationForPathAndMethod<
  P extends UrlPaths,
  M extends HttpMethods,
> = paths[P][M] extends { responses: infer R }
  ? R extends { 200: { content: { 'application/json': infer T } } }
    ? T
    : R extends { 201: { content: { 'application/json': infer T } } }
      ? T
      : unknown
  : unknown;

/**
 * Extracts the request body type for a given path and method.
 */
export type RequestBody<
  P extends UrlPaths,
  M extends HttpMethods,
> = paths[P][M] extends { requestBody: { content: infer C } }
  ? C extends { 'application/json': infer T }
    ? T
    : C extends { 'application/x-www-form-urlencoded': infer T }
      ? T
      : never
  : never;

/**
 * Extracts the response data type for a given path and method.
 */
export type ResponseData<
  P extends UrlPaths,
  M extends HttpMethods,
> = OperationForPathAndMethod<P, M>;

/**
 * Extracts the path parameters type for a given path and method.
 */
export type PathParams<
  P extends UrlPaths,
  M extends HttpMethods,
> = paths[P][M] extends { parameters: { path: infer T } } ? T : never;

/**
 * Extracts the query parameters type for a given path and method.
 */
export type QueryParams<
  P extends UrlPaths,
  M extends HttpMethods,
> = paths[P][M] extends { parameters: { query: infer T } } ? T : never;
