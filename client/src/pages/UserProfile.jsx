import React, { useContext, useEffect, useState } from 'react'
import { getUserProfile } from '../utils/userApi' 
import AuthContext from '../provider/authContext'

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);

    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const {token} = useContext(AuthContext)
    useEffect(()=>{

        const fetchUserProfile  = async ()=>{
            setIsloading(true);
            try{
                const response = await getUserProfile(token)
                console.log("hello",response)
                setUserProfile(response)
    
            }catch(error){
                console.log("error in profile page for useeffect", error)
                setError(error)
            }finally{
                setIsloading(false)
            };
            
        }
        if(token){
            fetchUserProfile()
        }
      
    },[token])

  return (
    <div>

    {isLoading ? ( 
        <p>Loading user profile ...</p>
    ) : error ? (
        <p>Error loading user profile</p>
    ) : userProfile ? (
        <div>
        <p>User Name: {userProfile.name}</p>
        <p>User Email: {userProfile.email}</p>
        <p>User Role: {userProfile.role}</p>
        </div>
    ): (
        <p>No user data avilable</p>
    )
}

    
    
    </div>
  )
}

export default UserProfile