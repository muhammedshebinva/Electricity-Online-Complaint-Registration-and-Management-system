import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../provider/authContext';
import { getAllcomplaints } from '../../utils/adminApi';
import ComplaintsDataDisplayTable from '../../components/Tables/ComplaintsDataDisplayTable';

function ViewComplients() {
    const [isLoading, setIsloading] = useState(false);
    const {token} = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [complaintData, setcomplaintsData] = useState([]);

    useEffect( ()=>{

        const fetchAllComplaints = async()=>{
        setIsloading(true);
        setError(null)
        try{
            const response =  await getAllcomplaints(token)
            setcomplaintsData(response)

        }catch(error){
            console.log("Error fetching complients", error)
        }finally{
            setIsloading(false)
        }
}
if(token){
            fetchAllComplaints()
        }

},[token])
    if(!token){
        return(
            <div>
            Not authorized please Login with Admin
            </div>
        )
    }
  return (
    <div>
    {
        isLoading ? (
            <p>Loading compliaints</p>
        ) :error ? (
            <p>Error loading complaints Data</p>
        ) : complaintData ? (
            
            complaintData.map((cmplData)=>(
               
                <ComplaintsDataDisplayTable data = {cmplData} />
               
            ))
            
        ) : (
            <p>No Complaits found</p>
        )

    }
    
    </div>
  )
}

export default ViewComplients