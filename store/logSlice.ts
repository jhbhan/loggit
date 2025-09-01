import { LogViewModel, QuestionViewModel } from '@/constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogState {
    logs: LogViewModel[];
    questions: QuestionViewModel[];
}

const initialState: LogState = {
    logs: [],
    questions: [],
};

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        addLog: (state, action: PayloadAction<LogViewModel>) => {
            state.logs.push(action.payload);
        },
        removeLog: (state, action: PayloadAction<number>) => {
            state.logs = state.logs.filter(log => log.id !== action.payload);
        },
        clearLogs: (state) => {
            state.logs = [];
        },
        addQuestion: (state, action: PayloadAction<QuestionViewModel>) => {
            state.questions.push(action.payload);
        },
        addQuestionToLog: (state, action: PayloadAction<{ logId: number; question: QuestionViewModel }>) => {
            const { logId, question } = action.payload;
            const log = state.logs.find(log => log.id === logId);
            if (log) {
                log.questionSet.push(question);
            }
        },
        removeQuestionFromLog: (state, action: PayloadAction<{ logId: number; questionId: number }>) => {
            const { logId, questionId } = action.payload;
            const log = state.logs.find(log => log.id === logId);
            if (log) {
                log.questionSet = log.questionSet.filter(question => question.id !== questionId);
            }
        },
        removeQuestion: (state, action: PayloadAction<number>) => {
            const questionId = action.payload;
            state.questions = state.questions.filter(question => question.id !== questionId);

            state.logs.forEach(log => {
                log.questionSet = log.questionSet.filter(question => question.id !== questionId);
            });
        }
    },
});

export const { addLog, removeLog, clearLogs, addQuestion, addQuestionToLog, removeQuestionFromLog, removeQuestion } = logSlice.actions;
export default logSlice.reducer;