import React, { useContext } from 'react'
import {  Link } from "react-router-dom";
import AuthContext from '../provider/authContext';
import './Nav.css'

//import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
//import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function Nav() {
    const {logout,token,userInfo} = useContext(AuthContext);

 
     
    function handleLogout(){
        logout()   
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      
      setAnchorEl(null);
      

    };

  

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
            {userInfo.role === "admin" &&
            <li>
                 <Link className='myLink' to="/admin/dashbord">Admin Dashbord</Link>
            </li>
            }
            {userInfo.role === "user" &&
            <li className='dropdown'>
            <Link className="myLink">Services</Link>
            <div className="dropdown-content">
              <Link className='myLink' to='/complient'>Register Complient</Link>
              <Link className='myLink' to='/'>Complient Status</Link>
              <Link className='myLink' to="/protected">contact</Link>
            </div>
            </li>
            }
           
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
           
             {userInfo.role === "user" &&
              <li>
                   <Link className='myLink' to="/profile">profile</Link>
              </li>
            }
  
    {token && 
      <div className='profileAvathar'>
      <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, }}>M</Avatar>
            </IconButton>
          </Tooltip>
  
  
            <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> <Link className='manuLink' to={'/profile'}>Profile</Link> 
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /><Link className='manuLink' to={'/profile'}> My account</Link> 
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>    
        </div>
        }
        </ul>
        </nav>
    
      </div>

  )
}

export default Nav