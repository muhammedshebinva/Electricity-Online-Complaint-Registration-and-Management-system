import React, { useContext } from 'react'
import '../../App.css'
import { deleteOfficer } from '../../utils/adminApi';
import AuthContext from '../../provider/authContext';

const UsersTable = (data) => {
  const {token} = useContext(AuthContext)
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Action', dataKey: 'action' },
    // Add more columns as needed
  ];
  let index = 1;

  const handleClick = async(id,token)=>{
    try{
      
      const res = await deleteOfficer(id,token)
      alert(res.message)

    }catch(error){
      console.log("Delete officer error ")
    }
    
  }
  
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.dataKey}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {data.data.map((user) => (
        <tr key={user.id} >
         <td key={user.id}>{index++}</td>
         <td key={user.id}>{user.name}</td>
         <td key={user.id}>{user.email}</td>
         <button onClick={()=>handleClick(user._id,token)}>Delete</button>
        </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable