import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../provider/authContext';
import { getAllOfficers } from '../../utils/adminApi';
import UsersTable from '../../components/UsersTable/UsersTable';


function ViewOfficers() {
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
        const response = await getAllOfficers(token)
        // console.log("hello",response)
        setUsersData(response)

    }catch(error){
        console.log('Error fetching officers:', error)
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
        <p>Loading ofiicers profile ...</p>
    ) : error ? (
        <p>Error loading ofiicers profile</p>
    ) : usersData ? (    
       <UsersTable data={usersData} />
    ): (
        <p>No officers data avilable</p>
    )
    }
    
    </div>
  )
}

export default ViewOfficers