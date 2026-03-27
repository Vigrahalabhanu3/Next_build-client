import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getMe } from '../services/auth.service.js';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const userData = await getMe();
                setUser(userData);
            } catch (error) {
                Cookies.remove('token');
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (token, userData) => {
        Cookies.set('token', token, { expires: 7 });
        setUser(userData);
    };

    const logoutUser = () => {
        Cookies.remove('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout: logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };