import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    avatarUrl?: string | null;
    streak?: number | null;
    currency?: number | null;
    lastStreakDate?: Date | null;
    // Add more fields as needed
}

const initialState: UserState = {
    id: null,
    name: 'Jason Bhan',
    email: null,
    avatarUrl: null,
    streak: 5,
    currency: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            return { ...state, ...action.payload };
        },
        clearUser(state) {
            return initialState;
        },
        updateUser(state, action: PayloadAction<Partial<UserState>>) {
            return { ...state, ...action.payload };
        },
        incrementStreak(state) {
            const today = new Date();
            if (state.lastStreakDate) {
                const yesterday = new Date(state.lastStreakDate);
                yesterday.setDate(yesterday.getDate() + 1);
                if (today.toDateString() === yesterday.toDateString()) {
                    state.streak = (state.streak || 0) + 1;
                } else {
                    state.streak = 1;
                }
            } else {
                state.streak = 1;
            }
            state.lastStreakDate = today;
        },
        setCurrency(state, action: PayloadAction<number | null>) {
            state.currency = action.payload;
        },
    },
});

export const { setUser, clearUser, updateUser, incrementStreak, setCurrency } = userSlice.actions;
export default userSlice.reducer;