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
