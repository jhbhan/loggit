import { LogSaveModel } from '@/constants/types';
import { addDocumentToUser } from './firestore';

export const createLog = async (log: LogSaveModel, userId: string) => {
    await addDocumentToUser<LogSaveModel>(userId, ['logs'], log);

    console.log('Log created:', log);
};

export const createQuestionForLog = async (
    questionText: string,
    logId: string,
    userId: string
) => {
    const question = {
        text: questionText,
        logId: logId,
    };
    await addDocumentToUser<typeof question>(
        userId,
        ['logs', logId, 'questions'],
        question
    );
    console.log('Question created:', question);
};
