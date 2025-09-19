import { FormAnswerType } from '@jhbhan/rn-form';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    answerValues: Record<string, FormAnswerType>;
    isSubmitting: boolean;
    showForm: boolean;
    selectLogId: number | null;
}

const initialState: FormState = {
    answerValues: {},
    isSubmitting: false,
    showForm: false,
    selectLogId: null,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFieldValue(state, action: PayloadAction<{ field: string; value: any }>) {
            state.answerValues[action.payload.field] = action.payload.value;
        },
        setFieldError(state, action: PayloadAction<{ field: string; error: string }>) {
            state.answerValues[action.payload.field] = action.payload.error;
        },
        setSubmitting(state, action: PayloadAction<boolean>) {
            state.isSubmitting = action.payload;
        },
        resetForm(state) {
            state.answerValues = {};
            state.isSubmitting = false;
        },
        setShowForm: (state, action: PayloadAction<boolean>) => {
            state.showForm = action.payload;
        },
        selectLogId(state, action: PayloadAction<number | null>) {
            state.selectLogId = action.payload;
        }
    },
});

export const { 
    setFieldValue, 
    setFieldError, 
    setSubmitting, 
    resetForm, 
    setShowForm,
    selectLogId
} = formSlice.actions;
export default formSlice.reducer;