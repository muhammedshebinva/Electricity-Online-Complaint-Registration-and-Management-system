import React from 'react'

function ViewComplaint(data) {
  return (
    <table>
          <thead>
            <tr>
              <th className='field-name-th'>Field Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          
          <tr>
                <td>Department</td>
                <td>{data.data.department}</td>
              </tr>
              <tr>
                <td>title</td>
                <td>{data.data.title}</td>
              </tr>

              <tr>
              <td>description</td>
              <td>{data.data.description}</td>
            </tr>

            <tr>
                <td>status</td>
                <td>{data.data.status}</td>
           </tr>

          <tr>
            <td>createdAt</td>
            <td>{data.data.createdAt}</td>
         </tr>

         <tr>
            <td>location</td>
            <td><pre>{JSON.stringify(data.data.location, null, 2)}</pre></td>
         </tr>

         <tr>
            <td>image</td>
            <td><pre>{JSON.stringify(data.data.image, null, 2)}</pre></td>
         </tr>


          
          </tbody>
        </table>
  )
}

export default ViewComplaint