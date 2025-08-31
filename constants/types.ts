import { FormQuestion } from "@jhbhan/rn-form";

export interface BaseModel {
    id: number,
    name: string
}

export interface LogDataModel extends BaseModel {
    questionSetId: number,
}

export interface LogViewModel extends BaseModel {
    questionSet: FormQuestion[];
}