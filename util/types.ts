import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

// Base document interface
export interface BaseDocument {
    id: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// User-related types

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    language: string;
}

// Log-related types (based on your existing app structure)
export interface Log extends BaseDocument {
    userId: string;
    title: string;
    content: string;
    category?: string;
    tags?: string[];
    mood?: number; // 1-10 scale
    isPrivate: boolean;
}

// Question-related types
export interface Question extends BaseDocument {
    userId: string;
    question: string;
    category?: string;
    isActive: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly';
}

// Response types
export interface QuestionResponse extends BaseDocument {
    userId: string;
    questionId: string;
    answer: string;
    mood?: number;
    date: Timestamp;
}

// Collection names
export const COLLECTIONS = {
    USERS: 'users',
    LOGS: 'logs',
    QUESTIONS: 'questions',
    RESPONSES: 'responses',
} as const;

// Error types
export interface FirebaseError {
    code: string;
    message: string;
    details?: any;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: FirebaseError;
    message?: string;
}

// Pagination types
export interface PaginationOptions {
    limit?: number;
    lastDoc?: any;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    hasMore: boolean;
    lastDoc?: any;
    total?: number;
}

// Form types for your app
export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
    displayName?: string;
}

export interface LogFormData {
    title: string;
    content: string;
    category?: string;
    tags?: string[];
    mood?: number;
    isPrivate: boolean;
}

export interface QuestionFormData {
    question: string;
    category?: string;
    frequency?: 'daily' | 'weekly' | 'monthly';
}

// Auth state types
export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

// Hook return types
export interface UseAuthReturn {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (
        email: string,
        password: string,
        displayName?: string
    ) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    error: string | null;
}

export interface UseFirestoreReturn<T> {
    data: T[];
    isLoading: boolean;
    error: string | null;
    add: (data: Omit<T, 'id'>) => Promise<string>;
    update: (id: string, data: Partial<T>) => Promise<void>;
    remove: (id: string) => Promise<void>;
    refresh: () => Promise<void>;
}
