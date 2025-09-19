import { LogSaveModel, QuestionSaveModel } from '@/constants/types';
import { addDocument, addDocumentToUser } from './firestore';

export const createLog = async (log: LogSaveModel, userId: string) => {
    await addDocumentToUser<LogSaveModel>(userId, ['logs'], log);

    console.log('Log created:', log);
};

export const addQuestionToLog = async (
    question: QuestionSaveModel,
    logId: string,
    userId: string
) => {
    await addDocumentToUser<QuestionSaveModel>(
        userId,
        ['logs', logId, 'questions'],
        question
    );
    console.log('Question created:', question);
};

export const createNewQuestion = async (
    question: QuestionSaveModel,
    userId: string
) => {
    await addDocument<QuestionSaveModel>('question', question);
    console.log('Question created:', question);
};
