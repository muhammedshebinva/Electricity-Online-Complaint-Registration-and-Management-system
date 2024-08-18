import React, { useContext, useEffect } from 'react'
import AuthContext from '../provider/authContext'
import { useNavigate } from 'react-router-dom'

function Home() {
  const {setLastRoute} = useContext(AuthContext)
  useEffect(() => {
    setLastRoute('/')

  }, [])

  const {token} = useContext(AuthContext)

  const navigate = useNavigate()
  
  return (
    <div>
    {token ? <h1>Home</h1> :
    
    <div>
    <button onClick={()=>navigate('/login')}>User Login</button> <br></br>
    <button onClick={()=>navigate('/officer/login')}>Officer Login</button> <br></br>
    <button onClick={()=>navigate('/admin/login')}>Admin Login</button> <br></br>
    </div>
    }

    </div>
  )
}

export default Home