import { BlogStatus } from '../blog-status.js';

/**
 * Shared query parameters for listing blogs.
 */
export interface ListBlogsOptions {
  status?: BlogStatus;
  authorId?: string;
  limit?: number;
  sort?: 'asc' | 'desc';
  cursor?: string;
}

/**
 * Generic Firestore Query interface.
 * Matches both firebase-admin and firebase client SDK.
 */
export interface FirestoreQueryLike {
  where(field: string, op: string, value: unknown): FirestoreQueryLike;
  orderBy(field: string, direction?: 'asc' | 'desc'): FirestoreQueryLike;
  limit(limit: number): FirestoreQueryLike;
  get(): Promise<unknown>;
  startAfter(...args: unknown[]): FirestoreQueryLike;
}

/**
 * Builds a Firestore query for blogs based on common options.
 *
 * @param baseQuery - The base CollectionReference or Query.
 * @param options - Query options (status, authorId, limit, sort).
 * @returns The configured Firestore query.
 */
export function buildBlogQuery<T>(
  baseQuery: T,
  options: ListBlogsOptions = {},
): T {
  let q = baseQuery as unknown as FirestoreQueryLike;

  if (options.status) {
    q = q.where('status', '==', options.status);
  }

  if (options.authorId) {
    q = q.where('authorId', '==', options.authorId);
  }

  if (options.sort) {
    q = q.orderBy('createdAt', options.sort);
  } else {
    q = q.orderBy('createdAt', 'desc');
  }

  if (options.limit) {
    q = q.limit(options.limit);
  }

  return q as unknown as T;
}

/**
 * Builds a Firestore query for attachments belonging to a blog.
 *
 * @param baseQuery - The base CollectionReference or Query for attachments.
 * @param blogId - The ID of the blog.
 * @returns The configured Firestore query.
 */
export function buildAttachmentsQuery<T>(
  baseQuery: T,
  blogId: string,
): T {
  const q = baseQuery as unknown as FirestoreQueryLike;
  return q.where('blogId', '==', blogId) as unknown as T;
}
