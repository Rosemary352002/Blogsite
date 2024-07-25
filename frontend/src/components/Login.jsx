import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import axios from 'axios'

const ADMIN_EMAIL = 'admin@gmail.com'; 
const ADMIN_PASSWORD = 'adminin';

const Login = () => {
  const navigate = useNavigate()
  
  const [input,setInput] = useState({Email:'',Password:''})
  const { setAuthenticated, setUserId, userId, login } = useAuth();

  useEffect(() => {
    return () => {
      setInput({ Email: '', Password: '' });
    };
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if entered credentials match admin credentials
    if (input.Email === ADMIN_EMAIL && input.Password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setUserId(ADMIN_EMAIL); // Assuming you want to set the userId as the email
      navigate('/admin'); // Navigate to admin page
      return; // Exit function after navigating
    }
  
    try {
      const response = await axios.get('http://localhost:3040/view', { params: { Email: input.Email } });
      const userData = response.data;
  
      if (userData.Email === input.Email && userData.Password === input.Password) {
        console.log("Credentials matched");
        setAuthenticated(true);
        setUserId(userData.Email);
        navigate('/'); // Redirect based on user role or other conditions
      } else {
        console.log("Credentials did not match");
        alert('Invalid username or password.'); // Show alert message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('An error occurred during login. Please try again later.'); // Show alert message for API call failures
    }
  };

    const backgroundStyle = {
      backgroundImage: 'url("./images/ideas.jpg")',
      backgroundSize: 'cover',
      
      height: '90vh',
      
  }
  return (
    <div style={backgroundStyle}>
    <div style={{textAlign:"center",padding:'15%'}}>
    <Typography variant='h4'>Login Here</Typography>
  
      
       <br/>
       <br/>
      <TextField label="Email" variant="filled" name="Email" required value={input.Email} onChange={handleChange} />
      <br />
      <br />
      <TextField label="Password" variant="filled" name="Password" required type="password" value={input.Password} onChange={handleChange} />
      <br />
      <br />
      <Button variant='contained' onClick={handleSubmit} >Login</Button>
      <br/>
      <br/>
      <Typography variant='h7'>Don't you have an account? <a href="http://localhost:5173/signup">Sign Up</a></Typography>
                  
                  
                
    </div>
    </div>
  )
}

export default Login
