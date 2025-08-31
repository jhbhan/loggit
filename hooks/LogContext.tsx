import { beforeBedQuestions, morningQuestions } from '@/constants/sampleQuestions';
import { LogViewModel } from '@/constants/types';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type LogContextType = {
    showForm: boolean;
    selectForm: (formId: number) => void;
    currentForm: LogViewModel | null;
    closeForm: () => void;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: ReactNode }) => {
    const [showForm, setShowForm] = useState(false);
    const [currentForm, setCurrentForm] = useState<LogViewModel | null>(null);

    const forms: Record<number, LogViewModel> = {
        1: {
            id: 1,
            questionSet: morningQuestions,
            name: 'Form 1'
        },
        2: {
            id: 2,
            questionSet: beforeBedQuestions,
            name: 'Form 2'
        }
    };

    const selectForm = (formId: number) => {
        const form = forms[formId];
        console.log(form.name)
        if (form) {
            setCurrentForm(form);
            setShowForm(true);
        }
    };

    const closeForm = () => {
        setShowForm(false);
        setCurrentForm(null);
    };

    const providerValue = { 
        showForm, 
        selectForm, 
        currentForm, 
        closeForm 
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