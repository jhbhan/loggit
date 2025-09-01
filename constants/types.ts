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
}

export interface QuestionViewModel extends FormQuestion {
}