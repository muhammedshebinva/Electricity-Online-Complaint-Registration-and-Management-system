import axios from 'axios'
const BASE_URL = 'http://localhost:5001/api/admin';

export const getAllUsers = async (token) =>{  
    try{
        const config= {
            headers: {
                authorization : `Bearer ${token}`
            } 
        }
        const response = await axios.get(`${BASE_URL}/users`, config);
        console.log("response to get users", response.data)
        
        return response.data;
    }catch(error){
        console.log("get user profile error",error)
    }
}