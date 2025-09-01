import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    values: Record<string, any>;
    errors: Record<string, string>;
    isSubmitting: boolean;
}

const initialState: FormState = {
    values: {},
    errors: {},
    isSubmitting: false,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFieldValue(state, action: PayloadAction<{ field: string; value: any }>) {
            state.values[action.payload.field] = action.payload.value;
        },
        setFieldError(state, action: PayloadAction<{ field: string; error: string }>) {
            state.errors[action.payload.field] = action.payload.error;
        },
        setSubmitting(state, action: PayloadAction<boolean>) {
            state.isSubmitting = action.payload;
        },
        resetForm(state) {
            state.values = {};
            state.errors = {};
            state.isSubmitting = false;
        },
    },
});

export const { setFieldValue, setFieldError, setSubmitting, resetForm } = formSlice.actions;
export default formSlice.reducer;