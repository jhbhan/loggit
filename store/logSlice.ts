import {
    beforeBedQuestions,
    morningQuestions,
} from '@/constants/sampleQuestions';
import {
    LogSaveModel,
    LogViewModel,
    QuestionSaveModel,
    QuestionViewModel,
} from '@/constants/types';
import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

const initialLogs: LogViewModel[] = [
    {
        id: 1,
        name: 'Before Bed Routine',
        questionSet: beforeBedQuestions,
    },
    {
        id: 2,
        name: 'Morning Routine',
        questionSet: morningQuestions,
    },
];

const questions: QuestionViewModel[] = [
    ...beforeBedQuestions,
    ...morningQuestions,
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
            const existingLog = state.logs.find((log) => log.id === logId);
            const newQuestionSet: QuestionViewModel[] = state.questions.filter(
                (q) => action.payload.questionIds.includes(q.id)
            );

            if (existingLog) {
                Object.assign(existingLog, {
                    ...action.payload,
                    questionSet: newQuestionSet,
                });
            } else {
                state.logs.push({
                    id: Date.now(),
                    ...action.payload,
                    questionSet: newQuestionSet,
                });
            }
        },
        removeLog: (state, action: PayloadAction<number>) => {
            state.logs = state.logs.filter((log) => log.id !== action.payload);
        },
        clearLogs: (state) => {
            state.logs = [];
        },
        saveQuestion: (state, action: PayloadAction<QuestionSaveModel>) => {
            const questionId = action.payload.id;
            const existingQuestion = state.questions.find(
                (question) => question.id === questionId
            );
            if (existingQuestion) {
                Object.assign(existingQuestion, action.payload);
            } else {
                state.questions.push({
                    id: Date.now(),
                    ...action.payload,
                });
            }
        },
        addQuestionToLog: (
            state,
            action: PayloadAction<{
                logId: number;
                question: QuestionViewModel;
            }>
        ) => {
            const { logId, question } = action.payload;
            const log = state.logs.find((log) => log.id === logId);
            if (log) {
                log.questionSet.push(question);
            }
        },
        removeQuestionFromLog: (
            state,
            action: PayloadAction<{ logId: number; questionId: number }>
        ) => {
            const { logId, questionId } = action.payload;
            const log = state.logs.find((log) => log.id === logId);
            if (log) {
                log.questionSet = log.questionSet.filter(
                    (question) => question.id !== questionId
                );
            }
        },
        removeQuestion: (state, action: PayloadAction<number>) => {
            const questionId = action.payload;
            state.questions = state.questions.filter(
                (question) => question.id !== questionId
            );

            state.logs.forEach((log) => {
                log.questionSet = log.questionSet.filter(
                    (question) => question.id !== questionId
                );
            });
        },
    },
});

export const makeGetQuestionsForLog = (logId: number | null) =>
    createSelector([(state: RootState) => state.log.logs], (logs) => {
        const log = logs.find((log) => log.id === logId);
        return log?.questionSet ?? [];
    });

export const getQuestionForId =
    (questionId: number | null) => (state: RootState) => {
        return (
            state.log.questions.find(
                (question) => question.id === questionId
            ) || null
        );
    };
export const removeQuestionFromLogThunk =
    (logId: number, questionId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(
                removeQuestionFromLog({
                    logId,
                    questionId,
                })
            );
        } catch (error) {}
    };

export const addQuestionToLogThunk = createAsyncThunk(
    'log/addQuestionToLog',
    async (
        payload: { logId: number; question: number },
        { dispatch, getState }
    ) => {
        try {
            const state = getState() as RootState;
            const question = state.log.questions.find(
                (q) => q.id === payload.question
            );
            if (!question) {
                throw new Error('Question not found');
            }
            dispatch(
                addQuestionToLog({
                    logId: payload.logId,
                    question: question,
                })
            );
        } catch (error) {}
    }
);
export const createLogThunk =
    (log: LogSaveModel) => async (dispatch: AppDispatch) => {
        try {
        } catch (error) {}
    };

export const {
    saveLog,
    removeLog,
    clearLogs,
    saveQuestion,
    addQuestionToLog,
    removeQuestionFromLog,
    removeQuestion,
} = logSlice.actions;
export default logSlice.reducer;
