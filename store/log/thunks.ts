import { LogSaveModel } from '@/constants/types';
import { logWriteService } from '@/util/services/logWriteService';
import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { addQuestionToLog, removeQuestionFromLog, saveLog } from './logSlice';

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
            await logWriteService.addQuestionToLog(question, payload.logId);
            dispatch(
                addQuestionToLog({
                    logId: payload.logId,
                    question: question,
                })
            );
        } catch (error) {}
    }
);

export const createLogThunk = createAsyncThunk(
    'log/createLog',
    async (log: LogSaveModel, { dispatch }) => {
        try {
            await logWriteService.createNewLog(log);
            dispatch(saveLog(log));
        } catch (error) {
            console.error('Failed to create log:', error);
        }
    }
);
