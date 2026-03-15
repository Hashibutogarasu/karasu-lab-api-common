import { z } from 'zod';
import { attachmentDataSchema } from './attachment.js';
import { BlogStatus } from './blog-status.js';

/**
 * Blog domain shared types.
 * Used by both the API package and the frontend.
 */

export { BlogStatus };
export type { BlogStatus as BlogStatusType } from './blog-status.js';

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
  likeCount: z.number().default(0),
});

export type BlogData = z.infer<typeof blogDataSchema>;

export const blogLikeSchema = z.object({
  userId: z.string(),
  createdAt: z.string(),
});

export type BlogLike = z.infer<typeof blogLikeSchema>;
