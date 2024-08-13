import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../provider/authContext';
import { getAllUsers } from '../../utils/adminApi';
import UsersTable from '../../components/UsersTable/UsersTable';

function ViewUsers() {

    const [isLoading, setIsloading] = useState(false);
    const {token} = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [usersData, setUsersData] = useState([]);
    //get users 
    useEffect(()=>{

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

  return (
    <div>

    {isLoading ? ( 
        <p>Loading user profile ...</p>
    ) : error ? (
        <p>Error loading user profile</p>
    ) : usersData ? (    
       <UsersTable data={usersData} />
    ): (
        <p>No user data avilable</p>
    )
}
    
    
    
    
    </div>
  )
}

export default ViewUsers