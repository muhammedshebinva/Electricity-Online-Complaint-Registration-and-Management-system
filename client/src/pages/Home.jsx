import React, { useContext, useEffect } from 'react'
import AuthContext from '../provider/authContext'
function Home() {
  const {setLastRoute} = useContext(AuthContext)
  useEffect(() => {
    setLastRoute('/')

  }, [])
  
  return (
    <div>Home</div>
  )
}

export default Home