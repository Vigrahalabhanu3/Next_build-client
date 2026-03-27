import { createContext, useState, useEffect } from 'react';

const ToastContext = createContext(null);

function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (toast) {
            const timerId = setTimeout(() => {
                setToast(null);
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [toast]);

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`toast-notification toast-${toast.type}`}>
                    <p className="toast-message">{toast.message}</p>
                    <button className="toast-close" onClick={() => setToast(null)}>
                        &times;
                    </button>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export { ToastContext, ToastProvider };