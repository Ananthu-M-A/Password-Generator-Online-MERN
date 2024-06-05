import React, { useContext, useEffect, useState } from "react";
import Toast from "../components/Toasts";
import axios from "axios";

export type ToastMessage = {
    message: string,
    type: "SUCCESS" | "ERROR";
}

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
}


const AppContext = React.createContext<AppContextType | undefined>(undefined);
export const AppContextProvider = (
    { children, }: { children: React.ReactNode; }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/user/validate-token`, {
                    withCredentials: true
                });
                if (response) {
                    setIsLoggedIn(true);
                    setIsError(false);
                }

            } catch (error) {
                setIsLoggedIn(false);
                setIsError(true);
            }
        };

        validateToken();
    }, [isLoggedIn]);

    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError,
        }}>
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => { setToast(undefined) }} />)}
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    const AuthContext = useContext(AppContext);
    if (!AuthContext) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return AuthContext;
}
