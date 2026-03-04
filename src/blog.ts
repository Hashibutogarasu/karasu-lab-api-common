/**
 * Blog domain shared types.
 * Used by both the API package and the frontend.
 */

export const BlogStatus = {
  ARCHIVED: 'archived',
  DRAFT: 'draft',
  LOCKED: 'locked',
  PUBLISHED: 'published',
} as const;

export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];
