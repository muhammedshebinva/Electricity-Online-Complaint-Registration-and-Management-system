import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../provider/authContext';
import { loginUser } from '../utils/userApi'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

      
      const {setUserInfo,token,login} = useContext(AuthContext);
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            login(response.token);
            setUserInfo(response);
            
        } catch (error) {
            console.error(error);
        }
    };
     return(
        <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
     )
    // ... form elements and submit handler
};

export default Login;
