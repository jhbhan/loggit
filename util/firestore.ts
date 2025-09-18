import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    serverTimestamp,
    startAfter,
    updateDoc,
    where,
    WriteBatch,
    writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

// Generic Firestore utility functions

/**
 * Get a single document by ID
 */
export const getDocument = async <T = DocumentData>(
    collectionName: string,
    docId: string
): Promise<T | null> => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as T;
        } else {
            return null;
        }
    } catch (error) {
        console.error(
            `Error getting document ${docId} from ${collectionName}:`,
            error
        );
        throw error;
    }
};

/**
 * Get all documents from a collection
 */
export const getCollection = async <T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = []
): Promise<T[]> => {
    try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, ...constraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as T[];
    } catch (error) {
        console.error(`Error getting collection ${collectionName}:`, error);
        throw error;
    }
};

/**
 * Add a new document to a collection
 */
export const addDocument = async <T = DocumentData>(
    collectionName: string,
    data: Omit<T, "id">
): Promise<string> => {
    try {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error(`Error adding document to ${collectionName}:`, error);
        throw error;
    }
};

/**
 * Update a document
 */
export const updateDocument = async <T = DocumentData>(
    collectionName: string,
    docId: string,
    data: Partial<T>
): Promise<void> => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error(
            `Error updating document ${docId} in ${collectionName}:`,
            error
        );
        throw error;
    }
};

/**
 * Delete a document
 */
export const deleteDocument = async (
    collectionName: string,
    docId: string
): Promise<void> => {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error(
            `Error deleting document ${docId} from ${collectionName}:`,
            error
        );
        throw error;
    }
};

/**
 * Query documents with specific conditions
 */
export const queryDocuments = async <T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[]
): Promise<T[]> => {
    try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, ...constraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as T[];
    } catch (error) {
        console.error(
            `Error querying documents from ${collectionName}:`,
            error
        );
        throw error;
    }
};

/**
 * Create a batch for multiple operations
 */
export const createBatch = (): WriteBatch => {
    return writeBatch(db);
};

/**
 * Commit a batch
 */
export const commitBatch = async (batch: WriteBatch): Promise<void> => {
    try {
        await batch.commit();
    } catch (error) {
        console.error("Error committing batch:", error);
        throw error;
    }
};

// Common query helpers
export const queryHelpers = {
    where: where,
    orderBy: orderBy,
    limit: limit,
    startAfter: startAfter,
};

// Example usage functions for common patterns

/**
 * Get documents by user ID
 */
export const getDocumentsByUserId = async <T = DocumentData>(
    collectionName: string,
    userId: string,
    orderByField: string = "createdAt",
    orderDirection: "asc" | "desc" = "desc"
): Promise<T[]> => {
    return queryDocuments<T>(collectionName, [
        where("userId", "==", userId),
        orderBy(orderByField, orderDirection),
    ]);
};

/**
 * Get recent documents with pagination
 */
export const getRecentDocuments = async <T = DocumentData>(
    collectionName: string,
    limitCount: number = 10,
    lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<T[]> => {
    const constraints: QueryConstraint[] = [
        orderBy("createdAt", "desc"),
        limit(limitCount),
    ];

    if (lastDoc) {
        constraints.push(startAfter(lastDoc));
    }

    return queryDocuments<T>(collectionName, constraints);
};
