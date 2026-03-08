import { z } from 'zod';
import { attachmentDataSchema } from './attachment.js';

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

export const blogDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  status: z.nativeEnum(BlogStatus),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  attachments: z.array(attachmentDataSchema).optional(),
});

export type BlogData = z.infer<typeof blogDataSchema>;
