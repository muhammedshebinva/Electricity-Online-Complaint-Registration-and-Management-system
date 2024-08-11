import React from 'react'
import './AdminDash.css'
import Grid from '@mui/system/Unstable_Grid';
import Box from '@mui/system/Box';
import styled from '@mui/system/styled';
function AdminDashbord() {

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
  flexDirection:"column"
}));
  return (
    <div className='admin-dash'>
  

  

    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid xs={3}>
          <Item>
          <button className='Menu-Link'>ViewUsers</button>
          <button className='Menu-Link'>ViewOfficers</button>
          <button className='Menu-Link'>ViewComplients</button>
          <button className='Menu-Link'>Create Officers</button>
          </Item>
        </Grid>
        
        <Grid xs={9}>

          <Item>2</Item>


        </Grid>
      </Grid>
    </Box>
    
    </div>
  )
}

export default AdminDashbord