import { signIn, signOutUser, signUp } from "@/util/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

type User = {
    id: string;
    name: string;
    email: string;
};

interface AuthState {
    isAuthenticated: boolean;
    user: null | User;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: User; token: string }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            console.log("here");
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export const loginThunk =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        const result = await signIn(email, password);
        if (result.user) {
            dispatch(
                login({
                    user: {
                        id: result.user.uid,
                        name: result.user.displayName ?? "User",
                        email: email,
                    },
                    token: "token",
                })
            );
            return;
        }
        return "Invalid email or password";
    };

export const signUpThunk =
    (name: string, email: string, password: string) =>
    async (dispatch: AppDispatch) => {
        const result = await signUp(name, email, password);
        if (result.user) {
            dispatch(
                login({
                    user: {
                        id: result.user.uid,
                        name: result.user.displayName ?? name,
                        email: email,
                    },
                    token: "token",
                })
            );
            return;
        }
        return "Error signing up";
    };

export const logoutThunk = () => async (dispatch: AppDispatch) => {
    try {
        await signOutUser();
        dispatch(logout());
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

export default authSlice.reducer;
