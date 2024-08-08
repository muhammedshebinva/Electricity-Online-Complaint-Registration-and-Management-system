import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userInfo,setUserInfo] = useState({})
    const [lastRoute, setLastRoute] = useState('')

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, userInfo, setUserInfo , lastRoute, setLastRoute }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
