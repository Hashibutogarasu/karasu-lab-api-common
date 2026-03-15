import { toDateString } from './date.js';
import type { BlogData } from '../blog.js';
import type { AttachmentData } from '../attachment.js';

export interface FirestoreDocLike {
  id: string;
  data(): Record<string, unknown> | undefined;
}

export interface FirestoreSnapshotLike {
  docs: FirestoreDocLike[];
}

export const mapBlog = (snapshot: unknown): BlogData => {
  const doc = snapshot as FirestoreDocLike;
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: toDateString(data?.createdAt),
    updatedAt: toDateString(data?.updatedAt),
  } as BlogData;
};

export const mapBlogs = (snapshot: unknown): BlogData[] => {
  const s = snapshot as FirestoreSnapshotLike;
  return s.docs.map(mapBlog);
};

export const mapAttachment = (snapshot: unknown): AttachmentData => {
  const doc = snapshot as FirestoreDocLike;
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: toDateString(data?.createdAt),
    updatedAt: toDateString(data?.updatedAt),
  } as AttachmentData;
};

export const mapAttachments = (snapshot: unknown): AttachmentData[] => {
  const s = snapshot as FirestoreSnapshotLike;
  return s.docs.map(mapAttachment);
};
