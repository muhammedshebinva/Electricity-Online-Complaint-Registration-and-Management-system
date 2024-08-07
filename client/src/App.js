import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import './App.css'
import Home from './pages/Home';
import Layout from './pages/Layout';
import Registration from './pages/Registration';

import { AuthContextProvider } from './provider/authContext';

import UserProfile from './pages/UserProfile';
import ComplientRegister from './pages/ComplientRegister';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <AuthContextProvider>
        <Router>
                <Routes>
                    <Route path="/" element={<Layout />}> 
                    <Route index element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration/>} />
                    <Route path="/protected" element={<Users />} />
                    <Route path='/profile' element={<UserProfile/>}/>
                    <Route path='/complient' element= {<ComplientRegister/>}/>
                    </Route>  
                </Routes>
            </Router>
            </AuthContextProvider>
    );
};
export default App;
