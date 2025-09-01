import { FormQuestion } from "@jhbhan/rn-form";

export interface BaseModel {
    id: number,
    name: string
}

export type Answer = string | number | boolean | undefined;
export type QuestionAnswers = Record<number, Answer>;

export interface LogDataModel extends BaseModel {
    questionSetId: number,
}

export interface LogViewModel extends BaseModel {
    questionSet: QuestionViewModel[];
    answers: QuestionAnswers;
    notificationTime?: Date;
    notificationFrequency?: 'daily' | 'weekly' | 'monthly' | 'custom';
}

export interface QuestionViewModel extends FormQuestion {
}