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