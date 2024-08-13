import React from 'react'
import '../../App.css'
const UsersTable = (data) => {
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { header: 'Email', dataKey: 'email' },
    // Add more columns as needed
  ];
  let index = 1;
  
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
         <td>{index++}</td>
         <td>{user.name}</td>
         <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable