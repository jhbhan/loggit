import { beforeBedQuestions, morningQuestions } from '@/constants/sampleQuestions';
import { LogViewModel, QuestionViewModel } from '@/constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    showForm: boolean;
    logs: LogViewModel[];
    questions: QuestionViewModel[];
}

const initialState: LogState = {
    showForm: false,
    logs: initialLogs,
    questions: questions,
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
        },
        setShowForm: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload);
            state.showForm = action.payload;
        }
    },
});

export const { 
    addLog, 
    removeLog, 
    clearLogs, 
    addQuestion, 
    addQuestionToLog, 
    removeQuestionFromLog, 
    removeQuestion, 
    setShowForm 
} = logSlice.actions;
export default logSlice.reducer;