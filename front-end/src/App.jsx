
import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import UserDashboard from './pages/UserDashboard';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<UserDashboard />}/>
            
          {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
  );
};

export default App;

