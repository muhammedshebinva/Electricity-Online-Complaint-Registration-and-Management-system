import React, { useContext } from 'react'
import {  Link } from "react-router-dom";
import AuthContext from '../provider/authContext';
function Nav() {
    const {logout, setUserInfo} = useContext(AuthContext);

    function handleLogout(){

        logout()
        
    }
  return (
    <div>
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Register">register</Link>
          </li>
          <li>
            <Link to="/protected">protected</Link>
          </li>
          <li>
             <button onClick={handleLogout}>logout</button>
        </li>
        </ul>
      </nav>
      </div>
  )
}

export default Nav