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
  startAfter(...args: unknown[]): FirestoreQueryLike;
}

/**
 * Builds a Firestore query for blogs based on common options.
 *
 * @param baseQuery - The base CollectionReference or Query.
 * @param options - Query options (status, authorId, limit, sort).
 * @returns The configured Firestore query.
 */
export function buildBlogQuery(
  baseQuery: FirestoreQueryLike,
  options: ListBlogsOptions = {},
): FirestoreQueryLike {
  let q = baseQuery;

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

  return q;
}

/**
 * Builds a Firestore query for attachments belonging to a blog.
 *
 * @param baseQuery - The base CollectionReference or Query for attachments.
 * @param blogId - The ID of the blog.
 * @returns The configured Firestore query.
 */
export function buildAttachmentsQuery(
  baseQuery: FirestoreQueryLike,
  blogId: string,
): FirestoreQueryLike {
  return baseQuery.where('blogId', '==', blogId);
}
