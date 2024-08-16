import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../provider/authContext';
import { getAllUsers } from '../../utils/adminApi';
import { deleteUser } from '../../utils/adminApi';

function ViewUsers() {

    const [isLoading, setIsloading] = useState(false);
    const {token} = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [usersData, setUsersData] = useState([]);
    //get users 

    const fetchAllUsers = async ()=>{
        setIsloading(true);
        setError(null);
        try{
            const response = await getAllUsers(token)
            // console.log("hello",response)
            setUsersData(response)

        }catch(error){
            console.log('Error fetching users:', error)
            setError(error)
        }finally{
            setIsloading(false)
        };
        
    }

    useEffect(()=>{

        if(token){
            fetchAllUsers()
        }
      
    },[token])

    if(!token){
        return (
            <div>
            Not authorized please Login with Admin
            </div>
        )  
    }

    //table
    const columns = [
        { header: 'ID', dataKey: 'id' },
        { header: 'Name', dataKey: 'name' },
        { header: 'Email', dataKey: 'email' },
        { header: 'detete', dataKey: 'action' },
        // Add more columns as needed
      ];
      let index = 1;
    
      const handleClick = async(id,token)=>{
        try{
          
          const res = await deleteUser(id,token)
          fetchAllUsers()
          alert(res.message)
    
        }catch(error){
          console.log("Delete officer error ")
        }
        
      } 

  return (
    <div>

    {isLoading ? ( 
        <p>Loading user profile ...</p>
    ) : error ? (
        <p>Error loading user profile</p>
    ) : usersData ? (  
          //table
    <table>
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.dataKey}>{column.header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
    {usersData.map((user) => (
      <tr key={user.id} >
       <td key={user.id}>{index++}</td>
       <td key={user.id}>{user.name}</td>
       <td key={user.id}>{user.email}</td>
       <button onClick={()=>handleClick(user._id,token)}>Delete</button>
      </tr>
      ))}
    </tbody>
  </table>
    ): (
        <p>No user data avilable</p>
    )
    }
    
    
    
    
    </div>
  )
}

export default ViewUsers