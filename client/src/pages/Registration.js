
import React, { useContext, useState } from 'react'
import { registerUser } from '../utils/userApi'
import {Navigate} from 'react-router-dom'
import  AuthContext  from '../provider/authContext'



function Registration() {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:''
    })
    const [redirect,setRedirect]= useState(false);
    const {setUserInfo,token,login} = useContext(AuthContext);

    const handleInputChange=(e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await registerUser(formData);
            console.log(response)
            login(response.token)

            setUserInfo(response);
            console.log("token",response.token)
            
            setRedirect(true);
            
        }catch(error){
            console.log('registration Rrror', error)
            alert('Registration failed. Please try again.');
        }
    }
    if(redirect){
    return<Navigate to={'/protected'}/>
    }
  return (
    <div>
    
    <form onSubmit={handleSubmit}>
    <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
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
        <button type="submit">Register</button>
    </form>
    
    </div>
  )
}

export default Registration
