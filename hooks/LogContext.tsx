import { beforeBedQuestions, morningQuestions } from '@/constants/sampleQuestions';
import { LogViewModel } from '@/constants/types';
import { FormAnswerType } from '@jhbhan/rn-form';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type LogContextType = {
    showForm: boolean;
    selectForm: (formId: number) => void;
    currentForm: LogViewModel | null;
    closeForm: () => void;
    answers: Record<number, FormAnswerType> | undefined;
    setAnswer: (questionId: number, answer: FormAnswerType) => void;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: ReactNode }) => {
    const [showForm, setShowForm] = useState(false);
    const [currentForm, setCurrentForm] = useState<LogViewModel | null>(null);
    const [answers, setAnswers] = useState<Record<number, FormAnswerType>>();
    const [forms, setForms] = useState<Record<number, LogViewModel>>({
        1: {
            id: 1,
            questionSet: morningQuestions,
            name: 'Form 1',
            answers: {}
        },
        2: {
            id: 2,
            questionSet: beforeBedQuestions,
            name: 'Form 2',
            answers: {}
        }
    });

    const selectForm = (formId: number) => {
        const form = forms[formId];
        if (form) {
            setCurrentForm(form);
            setShowForm(true);
            setAnswers(form.answers || {});
        }
    };

    const closeForm = () => {
        setForms((prevForms) => {
            if (currentForm != null) {
                const updatingForm = {
                    ...currentForm,
                    answers: answers || {}
                };

                // Create a shallow copy before updating
                const updatedForms = { ...prevForms };
                updatedForms[currentForm.id] = updatingForm;
                return updatedForms;
            }
            return prevForms;
        });
        setShowForm(false);
        setCurrentForm(null);
    };


    const setAnswer = (questionId: number, answer: FormAnswerType) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const providerValue = {
        showForm,
        selectForm,
        currentForm,
        closeForm,
        answers,
        setAnswer
    };

    return (
        <LogContext.Provider value={providerValue}>
            {children}
        </LogContext.Provider>
    );
};

export const useLogContext = () => {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error('useLogContext must be used within a LogProvider');
    }
    return context;
};