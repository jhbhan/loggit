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
        // Simulate an API call
        setTimeout(() => {
            dispatch(
                login({
                    user: { id: "1", name: "John Doe", email },
                    token: "dummy-token",
                })
            );
        }, 1000);

        return "hello world";
    };

export const signUpThunk =
    (name: string, email: string, password: string) =>
    async (dispatch: AppDispatch) => {
        // Simulate an API call
        setTimeout(() => {
            dispatch(
                login({
                    user: { id: "1", name, email },
                    token: "dummy-token",
                })
            );
        }, 1000);

        return "hello world";
    };

export const logoutThunk = () => async (dispatch: AppDispatch) => {
    // Simulate an API call
    setTimeout(() => {
        dispatch(logout());
    }, 1000);
};

export default authSlice.reducer;
