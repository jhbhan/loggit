import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

// Authentication utility functions

/**
 * Sign up a new user with email and password
 */
export const signUp = async (
    email: string,
    password: string,
    displayName?: string
): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Update display name if provided
        if (displayName && userCredential.user) {
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });
        }

        return userCredential;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

/**
 * Sign in an existing user with email and password
 */
export const signIn = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (updates: {
    displayName?: string;
    photoURL?: string;
}): Promise<void> => {
    try {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, updates);
        } else {
            throw new Error("No user is currently signed in");
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return auth.currentUser !== null;
};
