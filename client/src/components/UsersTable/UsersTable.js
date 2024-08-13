import React from 'react'

const UsersTable = (data) => {
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { header: 'Email', dataKey: 'email' },
    // Add more columns as needed
  ];


  
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
          <tr key={user.id}>
            {columns.map((column) => (
              <td key={column.dataKey}>{user[column.dataKey]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable