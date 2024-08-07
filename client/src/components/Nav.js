import React, { useContext } from 'react'
import {  Link } from "react-router-dom";
import AuthContext from '../provider/authContext';
import './Nav.css'
function Nav() {
    const {logout,token} = useContext(AuthContext);
     
    function handleLogout(){
        logout()   
    }
  return (
    <div>
    <nav>
        <ul>
        <li>
            <Link className='myLink' to="/">Logo</Link>
          </li>
          <li>
            <Link className='myLink' to="/">Home</Link>
          </li>
          <li className='dropdown'>
          <Link class="myLink">Services</Link>
          <div class="dropdown-content">
            <Link className='myLink' to='/complient'>Register Complient</Link>
            <Link className='myLink' to='/'>Complient Status</Link>
            <Link className='myLink' to="/protected">contact</Link>
          </div>
          </li>
         
          {!token && 
          <li>
            <Link className='myLink' to="/Register">register</Link>
          </li>
          }
          {!token && 
            <li>
              <Link className='myLink' to="/Login">Login</Link>
            </li>
            }
         
          {token && 
            <li>
                 <Link className='myLink' to="/profile">profile</Link>
            </li>
          }
         {token && 
          <li>
             <button className='myLink' onClick={handleLogout}>logout</button>
          </li>
        }
        </ul>
      </nav>
      </div>
  )
}

export default Nav