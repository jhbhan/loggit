import {
    LogSaveModel,
    QuestionAnswers,
    QuestionSaveModel,
} from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const logStorageKey = 'logData';
const questionStorageKey = 'questionData';
const questionAnswerStorageKey = 'questionAnswerData';

export const saveLogsToStorage = async (logs: LogSaveModel) => {
    try {
        const logsString = JSON.stringify(logs);
        await AsyncStorage.setItem(logStorageKey, logsString);
    } catch (error) {
        console.error('Error saving logs to storage:', error);
    }
};

export const getLogsFromStorage = async (): Promise<LogSaveModel | null> => {
    try {
        const logsString = await AsyncStorage.getItem(logStorageKey);
        if (logsString) {
            return JSON.parse(logsString) as LogSaveModel;
        }
        return null;
    } catch (error) {
        console.error('Error retrieving logs from storage:', error);
        return null;
    }
};

export const removeLogsFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(logStorageKey);
    } catch (error) {
        console.error('Error removing logs from storage:', error);
    }
};

export const saveQuestionsToStorage = async (questions: QuestionSaveModel) => {
    try {
        const questionsString = JSON.stringify(questions);
        await AsyncStorage.setItem(questionStorageKey, questionsString);
    } catch (error) {
        console.error('Error saving questions to storage:', error);
    }
};

export const getQuestionsFromStorage =
    async (): Promise<QuestionSaveModel | null> => {
        try {
            const questionsString = await AsyncStorage.getItem(
                questionStorageKey
            );
            if (questionsString) {
                return JSON.parse(questionsString) as QuestionSaveModel;
            }
            return null;
        } catch (error) {
            console.error('Error retrieving questions from storage:', error);
            return null;
        }
    };

export const removeQuestionsFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(questionStorageKey);
    } catch (error) {
        console.error('Error removing questions from storage:', error);
    }
};

type LogQuestionAnswerSaveModel = {
    logId: number;
    answers: Record<number, QuestionAnswers>;
    createdDate: string;
};

export const saveQuestionAnswersToStorage = async (
    logId: number,
    answers: Record<number, QuestionAnswers>
) => {
    try {
        const existingAnswers = await getQuestionAnswersFromStorage(logId);
        const newAnswer = {
            logId,
            answers,
            createdDate: new Date().toISOString(),
        };
        const updatedAnswers = [...(existingAnswers ?? []), newAnswer];
        await AsyncStorage.setItem(
            questionAnswerStorageKey,
            JSON.stringify(updatedAnswers)
        );
    } catch (error) {
        console.error('Error saving question answers to storage:', error);
    }
};

export const getQuestionAnswersFromStorage = async (
    logId: number
): Promise<LogQuestionAnswerSaveModel[] | null> => {
    try {
        const answersString = await AsyncStorage.getItem(
            questionAnswerStorageKey
        );
        if (answersString) {
            return JSON.parse(answersString) as LogQuestionAnswerSaveModel[];
        }
        return null;
    } catch (error) {
        console.error('Error retrieving question answers from storage:', error);
        return null;
    }
};

export const removeQuestionAnswersFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(questionAnswerStorageKey);
    } catch (error) {
        console.error('Error removing question answers from storage:', error);
    }
};

export const clearFormStorage = async () => {
    try {
        await Promise.all([
            removeLogsFromStorage(),
            removeQuestionsFromStorage(),
            removeQuestionAnswersFromStorage(),
        ]);
    } catch (error) {
        console.error('Error clearing form storage:', error);
    }
};
