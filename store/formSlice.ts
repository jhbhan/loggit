import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    values: Record<string, any>;
    errors: Record<string, string>;
    isSubmitting: boolean;
    showForm: boolean;
}

const initialState: FormState = {
    values: {},
    errors: {},
    isSubmitting: false,
    showForm: false,
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
        setShowForm: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload);
            state.showForm = action.payload;
        }
    },
});

export const { 
    setFieldValue, 
    setFieldError, 
    setSubmitting, 
    resetForm, 
    setShowForm
} = formSlice.actions;
export default formSlice.reducer;