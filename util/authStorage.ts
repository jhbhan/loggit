import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from './types';
export const authStorageKey = 'authData';
export const authTokenKey = 'authToken';
export const authUserKey = 'authUser';

export const saveTokenToStorage = async (token: string) => {
    try {
        await AsyncStorage.setItem(authTokenKey, token);
    } catch (error) {
        console.error('Error saving token to storage:', error);
    }
};

export const getTokenFromStorage = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem(authTokenKey);
        return token;
    } catch (error) {
        console.error('Error retrieving token from storage:', error);
        return null;
    }
};

export const removeTokenFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(authTokenKey);
    } catch (error) {
        console.error('Error removing token from storage:', error);
    }
};

export const saveUserToStorage = async (user: UserProfile) => {
    try {
        const userString = JSON.stringify(user);
        await AsyncStorage.setItem(authUserKey, userString);
    } catch (error) {
        console.error('Error saving user to storage:', error);
    }
};

export const getUserFromStorage = async (): Promise<UserProfile | null> => {
    try {
        const userString = await AsyncStorage.getItem(authUserKey);
        if (userString) {
            return JSON.parse(userString) as UserProfile;
        }
        return null;
    } catch (error) {
        console.error('Error retrieving user from storage:', error);
        return null;
    }
};

export const removeUserFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(authUserKey);
    } catch (error) {
        console.error('Error removing user from storage:', error);
    }
};

export const clearAuthStorage = async () => {
    try {
        await AsyncStorage.multiRemove([authTokenKey, authUserKey]);
    } catch (error) {
        console.error('Error clearing auth storage:', error);
    }
};
