const BASE_URL = 'http://localhost:5001/api/officers';

//officer login

export const loginOfficer = async (formData) => {
 try{
    const response = await fetch(`${BASE_URL}/login`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })

    if(!response.ok){
        alert('Login Failed')
    }
    const data =  await response.json()
    return data;

 }catch(error){ 
    alert("Officer Login Error")
   console.log(error)
 }
}

export const getAllComplaints = async (token) => {
    try{
        const response = await fetch(`${BASE_URL}/complaints`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error('Network response was not okay')
        }
        const data = await response.json()
        return data;

    }catch(error){
        console.log("get api eror",error)
    }
}

//upadte status
export const upadteComplaintStatus = async (complaintId,status)=>{
    try {
        const response = await fetch(`${BASE_URL}/complaints/${complaintId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: status })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json()
        return data;
        
      } catch (error) {
        console.log(error)
      }
}