import React from 'react';
import Login from './LoginPage/Login';
import Register from './RegisterPage/RegisterPage';
import CreateComplaint from './CreateComplient/CreateComplaint';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <Login />
      <hr />
      <Register />
      <hr />
      <CreateComplaint />
    </div>
  );
};

export default UserDashboard;
