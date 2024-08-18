import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../provider/authContext';
import { loginUser } from '../utils/userApi'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: ''
    //   });

      
    //   const {setUserInfo,token,login} = useContext(AuthContext);
      
    //   const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //   };
    
    
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await loginUser(formData);
    //         login(response.token);
    //         setUserInfo(response);
            
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    //  return(
    //     <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Email:</label>
    //       <input
    //         type="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleInputChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleInputChange}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
    const defaultTheme = createTheme();
    
    const {setUserInfo,token,login,lastRoute} = useContext(AuthContext);
    const navigate = useNavigate();

      const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
          email: data.get('email'),
          password: data.get('password'),
        };

        
          try {
            const response = await loginUser(userData);
            login(response);
            setUserInfo(response);
            navigate(lastRoute)
            
        } catch (error) {
            console.error(error);
        }
      };
    
      return (

  <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           User Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
             
              <Grid item>
                <Link to='/Register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>

     )
   
};

export default Login;
