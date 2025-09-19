import {
    LogSaveModel,
    QuestionSaveModel,
    QuestionViewModel,
} from '@/constants/types';
import { addDocument, addDocumentToUser, queryDocuments } from './firestore';
import { Path } from './firestorePaths';

export const createLog = async (log: LogSaveModel, userId: string) => {
    await addDocumentToUser<LogSaveModel>(userId, Path.Logs.base, log);

    console.log('Log created:', log);
};

export const addQuestionToLog = async (
    question: QuestionSaveModel,
    logId: string
) => {
    await addDocument<QuestionSaveModel>(Path.Logs.questions(logId), question);
    console.log('Question created:', question);
};

export const createNewQuestion = async (question: QuestionSaveModel) => {
    await addDocument<QuestionSaveModel>(Path.Questions.base, question);
    console.log('Question created:', question);
};

export const createNewLog = async (log: LogSaveModel) => {
    await addDocument<LogSaveModel>(Path.Logs.base, log);
    console.log('Log created:', log);
};

export const fetchLogsForUser = async (userId: string) => {
    // Implementation for fetching logs
    await queryDocuments<LogSaveModel>(Path.User.logs(userId), []);
};

export const fetchQuestionsForLog = async (logId: string) => {
    // Implementation for fetching questions for a specific log
    await queryDocuments<QuestionViewModel>(Path.Logs.questions(logId), []);
};
