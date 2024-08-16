import axios from 'axios'
const BASE_URL = 'http://localhost:5001/api/admin';
//Admin Login
export const loginAdmin = async (formData) => {
    try{
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData)
        });

        if(!response.ok){
            throw new Error('Login filed')
        }

        const data  = await response.json()
        return data;

    }catch(error){
        throw error;
    }
}

//get all users
export const getAllUsers = async (token) =>{  
    try{
        const config= {
            headers: {
                authorization : `Bearer ${token}`
            } 
        }
        const response = await axios.get(`${BASE_URL}/users`, config);
        return response.data;
    }catch(error){
        console.log("get user profile error",error)
    }
}
//delete user
export const deleteUser = async (userId, token) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}`, {
        headers: {
          'authorization': `Bearer ${token}` // Replace with your authentication scheme
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting officer:', error);
      throw error; // Or handle the error appropriately
    }
  };


//get all officers

export const getAllOfficers = async (token) => {
    try{
        const config ={
            headers:{
                authorization:`Bearer ${token}`
            }  
        }
        const response = await axios.get(`${BASE_URL}/officers`, config);
        return response.data;

    }catch(error){
        console.log("get officer profile error", error)
    }
}

// getAllComplients

export const getAllcomplaints = async (token) => {
    try{
        const config ={
            headers:{
                authorization:`Bearer ${token}`
            }  
        }
        const response = await axios.get(`${BASE_URL}/complaints`, config);
        return response.data;

    }catch(error){
        console.log("get complaints error", error)
    }
}

export const registerOfficer  = async (formData,token) => {
    try {
        const response = await fetch(`${BASE_URL}/officers`, {
            method: 'POST',
            headers: {
                authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if(!response.ok){
            throw new Error('Officer Registation Failed')
        }

        const data = await response.json();
        return data;

    } catch (error) {
    throw error;
  }
}

//delete User

export const deleteOfficer = async (officerId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/officers/${officerId}`, {
      headers: {
        'authorization': `Bearer ${token}` // Replace with your authentication scheme
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting officer:', error);
    throw error; // Or handle the error appropriately
  }
};








