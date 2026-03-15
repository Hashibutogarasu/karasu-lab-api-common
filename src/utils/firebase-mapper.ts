import { toDateString } from './date.js';
import { BlogData, BlogStatus } from '../blog.js';
import type { AttachmentData } from '../attachment.js';

/**
 * Generic interface for Firestore document snapshot data.
 * Compatible with both firebase-admin and firebase client SDK.
 */
export interface FirestoreDocLike {
  id: string;
  data(): Record<string, unknown> | undefined;
}

/**
 * Generic interface for Firestore query snapshot.
 * Compatible with both firebase-admin and firebase client SDK.
 */
export interface FirestoreSnapshotLike {
  docs: FirestoreDocLike[];
}

/**
 * Maps a Firestore blog document to a BlogData object.
 *
 * @param snapshot - Firestore DocumentSnapshot
 * @returns Typed BlogData object
 */
export const mapBlog = (snapshot: unknown): BlogData => {
  const doc = snapshot as FirestoreDocLike;
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    title: data?.title ?? '',
    content: data?.content ?? '',
    authorId: data?.authorId ?? '',
    status: (data?.status as BlogStatus) ?? BlogStatus.DRAFT,
    tags: (data?.tags as string[]) ?? [],
    createdAt: toDateString(data?.createdAt),
    updatedAt: toDateString(data?.updatedAt),
    likeCount: data?.likeCount ?? 0,
  } as BlogData;
};

/**
 * Maps Firestore blog documents to BlogData objects.
 *
 * @param snapshot - Firestore QuerySnapshot
 * @returns Array of typed BlogData objects
 */
export const mapBlogs = (snapshot: unknown): BlogData[] => {
  const s = snapshot as FirestoreSnapshotLike;
  return s.docs.map(mapBlog);
};

/**
 * Maps a Firestore attachment document to an AttachmentData object.
 *
 * @param snapshot - Firestore DocumentSnapshot
 * @returns Typed AttachmentData object
 */
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

/**
 * Maps Firestore attachment documents to AttachmentData objects.
 *
 * @param snapshot - Firestore QuerySnapshot
 * @returns Array of typed AttachmentData objects
 */
export const mapAttachments = (snapshot: unknown): AttachmentData[] => {
  const s = snapshot as FirestoreSnapshotLike;
  return s.docs.map(mapAttachment);
};
