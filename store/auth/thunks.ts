// All thunks for auth slice will go here

import { signIn, signOutUser, signUp } from '@/util/auth';
import { AppDispatch } from '../store';
import { login, logout } from './authSlice';

export const loginThunk =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        if (process.env.NODE_ENV !== 'production') {
            dispatch(
                login({
                    user: {
                        id: 'test-uid',
                        name: 'Test User',
                        email: email,
                    },
                    token: 'test-token',
                })
            );
        }
        const result = await signIn(email, password);
        if (result.user) {
            dispatch(
                login({
                    user: {
                        id: result.user.uid,
                        name: result.user.displayName ?? 'User',
                        email: email,
                    },
                    token: 'token',
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
                    user: {
                        id: 'test-uid',
                        name: 'Test User',
                        email: email,
                    },
                    token: 'test-token',
                })
            );
        }
        const result = await signUp(name, email, password);
        if (result.user) {
            dispatch(
                login({
                    user: {
                        id: result.user.uid,
                        name: result.user.displayName ?? name,
                        email: email,
                    },
                    token: 'token',
                })
            );
            return;
        }
        return 'Error signing up';
    };

export const logoutThunk = () => async (dispatch: AppDispatch) => {
    try {
        await signOutUser();
        dispatch(logout());
    } catch (error) {
        console.error('Error signing out:', error);
    }
};
