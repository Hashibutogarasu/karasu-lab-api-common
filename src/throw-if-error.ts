export interface BetterAuthError {
  code?: string | undefined;
  message?: string | undefined;
  status: number;
  statusText: string;
}

export function throwIfError<T>(
  data?: T,
  error?: BetterAuthError | null,
  ignoreThrowsIfNoData: boolean = false,
): T | undefined {
  if (error) {
    throw new Error(error.message);
  }

  if (ignoreThrowsIfNoData !== true && (data === null || data === undefined)) {
    throw new Error('Data is null');
  }

  return data;
}
