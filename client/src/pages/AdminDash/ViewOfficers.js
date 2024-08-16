import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../provider/authContext';
import { getAllOfficers } from '../../utils/adminApi';
import UsersTable from '../../components/Tables/UsersTable';
import { deleteOfficer } from '../../utils/adminApi';

function ViewOfficers() {
    const [isLoading, setIsloading] = useState(false);
    const {token} = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [usersData, setUsersData] = useState([]);

     //get users 

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

useEffect(()=>{

if(token){
    fetchAllUsers()
}


},[token])


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
      
      const res = await deleteOfficer(id,token)
      fetchAllUsers()
      alert(res.message)

    }catch(error){
      console.log("Delete officer error ")
    }
    
  }

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
        


    //    <UsersTable data={usersData} />
    ): (
        <p>No officers data avilable</p>
    )
    }
    
    </div>
  )
}

export default ViewOfficers