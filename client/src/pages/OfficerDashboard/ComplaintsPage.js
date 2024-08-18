import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../provider/authContext'
import { getAllComplaints } from '../../utils/officerApi'
import ViewComplaint from './ViewComplaint';

function ComplaintsPage() {

const [loading, setLoading] = useState(false)
const [complaintsData, setComplaintsData] = useState([]);
const {token} = useContext(AuthContext)
const [error, setError] = useState(null);
const [page, setPage] = useState()

let index = 1;
 //get all complaints
 const fetchAllComplaints =  async () => {
    setLoading(true)
    setError(null);
    try{
        const response = await getAllComplaints(token)
        setComplaintsData(response)
        console.log(complaintsData)

    }catch(error){
        console.log("error fetching complaints", error)
        setError(error)
    }finally{
        setLoading(false)
    }
    
 }
//move to complait details
 const handleRowClick = (page)=>{
    setPage(page)
 }


 useEffect(() => {
    if(token){
        fetchAllComplaints()
    }
 
 }, [token])
 
 if(!token){
    return(
        <div>Un Autherized please login</div>
    )
 }


  return (
    <div>
    {page ? page : 

    <div>
    {  loading ? (
        <p>Loading</p>
    ) : error ? (
        <p>Error loading ofiicers profile</p>
    ) : complaintsData ? (
        <table>
        <thead>
        <tr>
           <th>Number</th>
           <th>title</th>
           <th>status</th>
        </tr>
        </thead>

        <tbody>
        {complaintsData.map((data)=>(
            <tr key={data.id} onClick={()=> handleRowClick(<ViewComplaint data={data} />)} >
            <td> {index++} </td>
            <td> {data.title} </td>
            <td>  {data.status} </td>
            </tr>
    ))}
        </tbody>
        </table>
        


    ) : <p> No data</p>

   }
    
    </div>
}
</div>
  )
}

export default ComplaintsPage