import React, { useContext, useState } from 'react'
import '../AdminDash/AdminDash.css'
import Grid from '@mui/system/Unstable_Grid';
import Box from '@mui/system/Box';
import styled from '@mui/system/styled';

import AuthContext from '../../provider/authContext';
import { useNavigate } from 'react-router-dom';
import ComplaintsPage from './ComplaintsPage';


function OfficerDashboard() {

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
  margin:'10px',
  height:'80vh',
  display:'flex',
  flexDirection:"column",
  overflow: 'scroll'

}));

const [view, setView] = useState()
const {token} = useContext(AuthContext)
const navigate = useNavigate();

const handleMenuClick = (page)=> {
  setView(page)
}

if(!token){
  navigate('/officer/login')
}

  return (
    <div className='admin-dash'>
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid xs={3}>
          <Item>
          <button className='Menu-Link' onClick={()=>handleMenuClick(<ComplaintsPage/>)}>ViewComplients</button>
          <button className='Menu-Link' onClick={()=>handleMenuClick()}>ViewProfile</button>
          </Item>
        </Grid>

        <Grid  xs={9}>
        {view ?  <Item>{view}</Item> : <Item> <h4>Welcome to Officer DashBoard</h4> </Item>}
         
          
        </Grid>
      </Grid>
    </Box>
    
    </div>
  )
}

export default OfficerDashboard;