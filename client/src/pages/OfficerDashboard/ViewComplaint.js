import React, { useState } from 'react'
import '../../App.css'
import { upadteComplaintStatus } from '../../utils/officerApi';
function ViewComplaint(data) {
    const [status, setStatus] = useState(data.data.status);
    const handleUpdate= async (id)=>{
       const response =  await upadteComplaintStatus(id,status)
        if(response){
            alert("Status Updated")
        }
    }
 
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
                <td>{status}</td>
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

         <tr>
            <td>update Status</td>
            <td>
            <select className='Status-select' value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="working">Working</option>
            <option value="completed">Completed</option>
          </select>
            <button className='statusbutton' onClick={()=>handleUpdate(data.data._id)}>Submit</button></td>
         </tr>


          
          </tbody>
        </table>
  )
}

export default ViewComplaint