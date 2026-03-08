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
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  attachments: z.array(attachmentDataSchema).optional(),
});

export type BlogData = z.infer<typeof blogDataSchema>;
