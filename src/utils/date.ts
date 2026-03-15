/**
 * Converts a Firestore Timestamp or Date-like object to an ISO 8601 string.
 *
 * @param val - The value to convert (Firestore Timestamp, Date, or string)
 * @returns ISO 8601 formatted string
 */
export const toDateString = (val: unknown): string => {
  if (val == null) return '';

  if (typeof (val as { toDate?: unknown }).toDate === 'function') {
    return (val as { toDate(): Date }).toDate().toISOString();
  }

  if (val instanceof Date) {
    return val.toISOString();
  }

  if (typeof val === 'object' && 'toISOString' in val) {
    return (val as { toISOString(): string }).toISOString();
  }

  if (typeof val === 'string') {
    return val;
  }

  return '';
};
