// All thunks for auth slice will go here

import { signIn, signOutUser, signUp } from '@/util/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IdTokenResult } from 'firebase/auth';
import { login, logout } from './authSlice';
import { clearAuthStorage, getUserFromStorage } from './authStorage';

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
        const user = await getUserFromStorage();
        if (user) {
            await user.getIdToken();
            dispatch(login(user));
        }
        return;
    }
);

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (
        { email, password }: { email: string; password: string },
        { dispatch }
    ) => {
        if (process.env.NODE_ENV !== 'production') {
            dispatch(login(TEST_USER));
        }
        const result = await signIn(email, password);
        if (result.user) {
            const token = await result.user.getIdToken();
            dispatch(login(TEST_USER));
            return;
        }
        return 'Invalid email or password';
    }
);

export const signUpThunk = createAsyncThunk(
    'auth/signUp',
    async (
        {
            name,
            email,
            password,
        }: { name: string; email: string; password: string },
        { dispatch }
    ) => {
        if (process.env.NODE_ENV !== 'production') {
            dispatch(login(TEST_USER));
        }
        const result = await signUp(name, email, password);
        if (result.user) {
            dispatch(login(result.user));
            return;
        }
        return 'Error signing up';
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        try {
            await signOutUser();
            await clearAuthStorage();
            dispatch(logout());
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
);
