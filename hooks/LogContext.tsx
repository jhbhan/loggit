import React, { createContext, ReactNode, useContext, useState } from 'react';

type LogContextType = {
    showForm: boolean;
    setShowForm: (show: boolean) => void;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: ReactNode }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <LogContext.Provider value={{ showForm, setShowForm }}>
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