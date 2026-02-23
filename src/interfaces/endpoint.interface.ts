export interface IEndpoint<
  Path extends string = string,
  Options = unknown,
  Output = unknown,
> {
  readonly path: Path;
  readonly options: Options;
  execute: (ctx: unknown) => Promise<Output>;
}
