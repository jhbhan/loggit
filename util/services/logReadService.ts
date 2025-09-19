import { LogSaveModel, QuestionViewModel } from '@/constants/types';
import { queryDocuments } from '../firestore';
import { Path } from '../firestorePaths';

export namespace LogReadService {
    export const fetchLogsForUser = async (userId: string) => {
        // Implementation for fetching logs
        await queryDocuments<LogSaveModel>(Path.User.logs(userId), []);
    };

    export const fetchQuestionsForLog = async (logId: string) => {
        // Implementation for fetching questions for a specific log
        await queryDocuments<QuestionViewModel>(Path.Logs.questions(logId), []);
    };
}
