import React, { createContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userRole, setUserRole] = useState(null)
    const [userInfo,setUserInfo] = useState({})
    const [lastRoute, setLastRoute] = useState('')


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserRole = localStorage.getItem('userRole');
        if (storedToken && storedUserRole) {
            setToken(storedToken);
            setUserRole(storedUserRole);
        }
    }, []);

    const login = (userData) => {
        setToken(userData.token);
        setUserRole(userData.role);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userRole', userData.role);
    };

    const logout = () => {
        setToken(null);
        setUserInfo({});
        setUserRole(null)
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, userInfo, setUserInfo , lastRoute, setLastRoute, userRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
