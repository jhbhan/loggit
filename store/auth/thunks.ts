// All thunks for auth slice will go here

import { signIn, signOutUser, signUp } from '@/util/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IdTokenResult } from 'firebase/auth';
import { AppDispatch } from '../store';
import { login, logout } from './authSlice';
import {
    clearAuthStorage,
    getTokenFromStorage,
    getUserFromStorage,
} from './authStorage';

const TEST_USER = {
    email: 'email@example.com',
    emailVerified: false,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: '',
    tenantId: null,
    delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    getIdToken: function (forceRefresh?: boolean): Promise<string> {
        throw new Error('Function not implemented.');
    },
    getIdTokenResult: function (
        forceRefresh?: boolean
    ): Promise<IdTokenResult> {
        throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    toJSON: function (): object {
        throw new Error('Function not implemented.');
    },
    displayName: 'Test User',
    phoneNumber: 'Test Phone',
    photoURL: null,
    providerId: '',
    uid: 'test id',
};

export const initialLogIn = createAsyncThunk(
    'auth/initialLogIn',
    async (_, { dispatch }) => {
        const token = await getTokenFromStorage();
        if (token) {
            // If token exists, you might want to validate it or fetch user info
            const user = await getUserFromStorage();
            if (user) {
                dispatch(
                    login({
                        user: user,
                        token: token,
                    })
                );
            }
        }
        // Placeholder for any initial login logic, e.g., checking stored tokens
        // For now, we assume no user is logged in initially
        return;
    }
);

export const loginThunk =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        if (process.env.NODE_ENV !== 'production') {
            dispatch(
                login({
                    user: TEST_USER,
                    token: 'test-token',
                })
            );
        }
        const result = await signIn(email, password);
        if (result.user) {
            const token = await result.user.getIdToken();
            dispatch(
                login({
                    user: result.user,
                    token: token,
                })
            );
            return;
        }
        return 'Invalid email or password';
    };

export const signUpThunk =
    (name: string, email: string, password: string) =>
    async (dispatch: AppDispatch) => {
        if (process.env.NODE_ENV !== 'production') {
            dispatch(
                login({
                    user: TEST_USER,
                    token: 'test-token',
                })
            );
        }
        const result = await signUp(name, email, password);
        if (result.user) {
            const token = await result.user.getIdToken();
            dispatch(
                login({
                    user: result.user,
                    token: token,
                })
            );
            return;
        }
        return 'Error signing up';
    };

export const logoutThunk = () => async (dispatch: AppDispatch) => {
    try {
        await signOutUser();
        await clearAuthStorage();
        dispatch(logout());
    } catch (error) {
        console.error('Error signing out:', error);
    }
};
