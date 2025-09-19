export namespace Path {
    export namespace User {
        export const base = 'users';
    }
    export namespace Logs {
        export const base = 'logs';
        export const questions = (logId: string) => `logs/${logId}/questions`;
    }

    export namespace Questions {
        export const base = 'questions';
    }
}
