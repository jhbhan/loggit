import { beforeBedQuestions, morningQuestions } from '@/constants/sampleQuestions';
import { LogSaveModel, LogViewModel, QuestionSaveModel, QuestionViewModel } from '@/constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialLogs: LogViewModel[] = [
    {
        id: 1,
        name: 'Before Bed Routine',
        questionSet: beforeBedQuestions,
    },
    {
        id: 2,
        name: 'Morning Routine',
        questionSet: morningQuestions
    }
];

const questions: QuestionViewModel[] = [
    ...beforeBedQuestions,
    ...morningQuestions
];

interface LogState {
    logs: LogViewModel[];
    questions: QuestionViewModel[];
}

const initialState: LogState = {
    logs: initialLogs,
    questions: questions,
};

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        saveLog: (state, action: PayloadAction<LogSaveModel>) => {
            const logId = action.payload.id;
            const existingLog = state.logs.find(log => log.id === logId);
            if (existingLog) {
                Object.assign(existingLog, action.payload);
            } else {
                state.logs.push({
                    id: Date.now(),
                    ...action.payload
                });
            }
        },
        removeLog: (state, action: PayloadAction<number>) => {
            state.logs = state.logs.filter(log => log.id !== action.payload);
        },
        clearLogs: (state) => {
            state.logs = [];
        },
        saveQuestion: (state, action: PayloadAction<QuestionSaveModel>) => {
            const questionId = action.payload.id;
            const existingQuestion = state.questions.find(question => question.id === questionId);
            if (existingQuestion) {
                Object.assign(existingQuestion, action.payload);
            } else {

                state.questions.push({
                    id: Date.now(),
                    ...action.payload,
                });
            }
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

export const getQuestionsForLog = (logId: number | null) => (state: RootState) => {
    const log = state.log.logs.find(log => log.id === logId);
    return log ? log.questionSet : [];
};

export const getQuestionForId = (questionId: number | null) => (state: RootState) => {
    return state.log.questions.find(question => question.id === questionId) || null;
};

export const { 
    saveLog, 
    removeLog, 
    clearLogs, 
    saveQuestion, 
    addQuestionToLog, 
    removeQuestionFromLog, 
    removeQuestion
} = logSlice.actions;
export default logSlice.reducer;