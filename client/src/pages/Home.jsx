import React, { useContext, useEffect } from 'react'
import AuthContext from '../provider/authContext'
import { useNavigate } from 'react-router-dom'
import '../App.css'
function Home() {
  const {setLastRoute} = useContext(AuthContext)
  useEffect(() => {
    setLastRoute('/')

  }, [])

  const {token} = useContext(AuthContext)

  const navigate = useNavigate()
  
  return (
    <div >
    <div className='home-page-main'> </div>
    
    {token ? 
      <div>
      <div className='home-control-div'>
      <h1>register Your Complaints</h1>
      <p>This platform enables you to register your complaints</p>
      </div>
      <div className='home-button-div'>
      <button className='home-button' onClick={()=>navigate('/complient')}>Register Complaint</button> <br></br>
      <button className='home-button' onClick={()=>navigate('/')}>View Complaint Status</button> <br></br>
      <button className='home-button' onClick={()=>navigate('/protected')}>contact</button> <br></br>
      </div>
      </div>
      :
    <div>
    <div className='home-control-div'>
    <h1>register Your Complaints</h1>
    <p>This platform enables you to register your complaints</p>
    </div>
    <div className='home-button-div'>
    <button className='home-button' onClick={()=>navigate('/login')}>User Login</button> <br></br>
    <button className='home-button' onClick={()=>navigate('/officer/login')}>Officer Login</button> <br></br>
    <button className='home-button' onClick={()=>navigate('/admin/login')}>Admin Login</button> <br></br>
    </div>
    </div>
    }
   
    </div>
  )
}

export default Home