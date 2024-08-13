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

