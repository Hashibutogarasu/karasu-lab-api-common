import { BlogStatus } from '../blog-status.js';

export interface ListBlogsOptions {
  status?: BlogStatus;
  authorId?: string;
  limit?: number;
  sort?: 'asc' | 'desc';
  cursor?: string;
}

export interface FirestoreQueryLike {
  where(field: string, op: string, value: unknown): FirestoreQueryLike;
  orderBy(field: string, direction?: 'asc' | 'desc'): FirestoreQueryLike;
  limit(limit: number): FirestoreQueryLike;
  startAfter(...args: unknown[]): FirestoreQueryLike;
}

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

export function buildAttachmentsQuery<T>(
  baseQuery: T,
  blogId: string,
): T {
  const q = baseQuery as unknown as FirestoreQueryLike;
  return q.where('blogId', '==', blogId) as unknown as T;
}
