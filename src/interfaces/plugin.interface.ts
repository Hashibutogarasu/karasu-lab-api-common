import { IEndpoint } from './endpoint.interface.js';

export interface IBAuthPlugin {
  readonly id: string;
  readonly endpoints: Record<string, IEndpoint>;
}
