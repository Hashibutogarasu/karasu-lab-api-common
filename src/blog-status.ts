/**
 * Blog status enumeration.
 */
export const BlogStatus = {
  ARCHIVED: 'archived',
  DRAFT: 'draft',
  LOCKED: 'locked',
  PUBLISHED: 'published',
} as const;

/**
 * Blog status type.
 */
export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];
