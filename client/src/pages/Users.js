// import React, { useContext, useEffect, useState } from 'react';
// import AuthContext from '../provider/authContext';
// import api from '../utils/api';

// const Users = () => {
//     const { token } = useContext(AuthContext);
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await api.getUsers(token);
//                 setUsers(data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         if (token) {
//             fetchUsers();
//         }
//     }, [token]);

//     // ... render user details
// };

// export default Users;
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../provider/authContext'

function Users() {
  const {token} = useContext(AuthContext)
  if(!token){
    return <Navigate to='/login'/>
  }
  return (
    <div>Users</div>
  )
}

export default Users