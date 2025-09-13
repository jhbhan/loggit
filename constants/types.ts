import { FormQuestion, QuestionFormat } from "@jhbhan/rn-form";

export interface BaseModel {
    id: number,
    name: string
}

export type Answer = string | number | boolean | undefined;
export type QuestionAnswers = Record<number, Answer>;

export interface LogDataModel extends BaseModel {
    questionSetId: number,
}

export type TimePeriod = 'AM' | 'PM';

type Time = {
    hours: number;
    minutes: number;
    ampm: TimePeriod;
}

export interface LogViewModel extends BaseModel {
    questionSet: QuestionViewModel[];
    notificationTime?: Time;
    notificationFrequency?: 'daily' | 'weekly' | 'monthly' | 'custom';
}

export interface LogSaveModel extends Omit<LogViewModel, 'id' | 'questionSet'> {
    id?: number,
    questionIds: number[]
}

export interface QuestionViewModel extends FormQuestion {
}

export interface QuestionSaveModel extends Omit<QuestionViewModel, 'id'> {
    id?: number
}

interface QuestionTypeInfo {
    type: QuestionFormat,
    title: string
}

export const questionFormats: QuestionTypeInfo[] = [
    { type: QuestionFormat.Text, title: 'Text' },
    { type: QuestionFormat.MultipleChoice, title: 'Multiple Choice' },
    { type: QuestionFormat.Rating, title: 'Rating' },
    { type: QuestionFormat.Date, title: 'Date' },
    { type: QuestionFormat.Number, title: 'Number' },
    { type: QuestionFormat.TrueFalse, title: 'True/False' }
];

export type Entity<T> = {
    id: number;
    value: T;
};