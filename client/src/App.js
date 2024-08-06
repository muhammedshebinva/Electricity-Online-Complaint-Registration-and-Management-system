import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';
import AuthContext from './context/AuthContext';

const App = () => {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </Router>
        </AuthContextProvider>
    );
};

export default App;
