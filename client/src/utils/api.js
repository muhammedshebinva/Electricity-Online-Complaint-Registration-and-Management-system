// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5001/api/users',
// });

// export const register = async (credentials) =>{
//     console.log(credentials)
//     const response = await api.post('/register', credentials); 
    
//     return response.data.token;
// }

// export const login = async (credentials) => {
//     const response = await api.post('/login', credentials);
//     return response;
// };

// export const getUsers = async (token) => {
//     const response = await api.get('/users', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return response.data;
// };


// export default api;
