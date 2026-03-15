import { toDateString } from './date.js';
import type { BlogData } from '../blog.js';
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
 * @param doc - Firestore DocumentSnapshot
 * @returns Typed BlogData object
 */
export const mapBlog = (doc: FirestoreDocLike): BlogData => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: toDateString(data?.createdAt),
    updatedAt: toDateString(data?.updatedAt),
  } as BlogData;
};

/**
 * Maps Firestore blog documents to BlogData objects.
 *
 * @param snapshot - Firestore QuerySnapshot
 * @returns Array of typed BlogData objects
 */
export const mapBlogs = (snapshot: FirestoreSnapshotLike): BlogData[] =>
  snapshot.docs.map(mapBlog);

/**
 * Maps a Firestore attachment document to an AttachmentData object.
 *
 * @param doc - Firestore DocumentSnapshot
 * @returns Typed AttachmentData object
 */
export const mapAttachment = (doc: FirestoreDocLike): AttachmentData => {
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
export const mapAttachments = (snapshot: FirestoreSnapshotLike): AttachmentData[] =>
  snapshot.docs.map(mapAttachment);
