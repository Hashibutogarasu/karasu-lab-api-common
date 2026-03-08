import { z } from 'zod';

/**
 * Attachment metadata schema.
 */
export const attachmentDataSchema = z.object({
  id: z.string(),
  blogId: z.string(),
  key: z.string(),
  contentType: z.string(),
  size: z.number(),
  status: z.enum(['draft', 'published', 'archived', 'locked']),
  authorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Attachment metadata type.
 */
export type AttachmentData = z.infer<typeof attachmentDataSchema>;
