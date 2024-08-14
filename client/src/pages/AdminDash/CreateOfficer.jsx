import React, {useContext, useState } from 'react'
import {registerOfficer} from '../../utils/adminApi'
import {Navigate} from 'react-router-dom'
import AuthContext from '../../provider/authContext';



function CreateOfficer() {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        department:'',
        contactNumber:''

    })
    const [redirect,setRedirect]= useState(false);
    const {token} = useContext(AuthContext)


 

    const handleInputChange=(e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formData)
        try{
            
            const response = await registerOfficer(formData,token);
            console.log(response)  
            setRedirect(true);
            
        }catch(error){
            console.log('registration Rrror', error)
            alert('Registration failed. Please try again.');
        }
    }
    if(redirect){
    return<Navigate to={'/admin/dashbord'}/>
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

   

      
        <div>
        <label>department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
      <label>contact Number:</label>
      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleInputChange}
        required
      />
    </div>
        <button type="submit">Register</button>
    </form>
    
    </div>
  )
}

export default CreateOfficer