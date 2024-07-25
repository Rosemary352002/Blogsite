import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
   const [input,setInput] = useState({FirstName:'',LastName:'',MobNo:'',Email:'',Password:'',role:'user'})
    const handleChange = (e) =>{
      setInput({...input,[e.target.name]:e.target.value})
      console.log(input)
    }

   
    const backgroundStyle = {
      backgroundImage: 'url("./images/temp.jpg")',
      backgroundSize: 'cover',
      height: '90vh',
      
  }
  const addData = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3040/add', input)
    .then((response) => {
      console.log(response.data)
      console.log("data added")
      navigate('/login')
    })
    .catch((error) => {
      console.log(error)
    })
    
  };
  return (
    <div style={backgroundStyle}>
      
      <div style={{textAlign:"left",paddingTop:"2%",paddingLeft:"5%"}}>
    
      <Typography  variant='h5' >Create an account</Typography>
        <br/>
      <TextField  label="First Name" variant="filled" required onChange={handleChange} name="FirstName" value={input.FirstName} />
      <br />
      <br />
      <TextField label="Last Name" variant="filled" required onChange={handleChange} name="LastName" value={input.LastName} />
      <br />
      <br />
      <TextField label="Mob no" variant="filled" required onChange={handleChange} name="MobNo" value={input.MobNo} />
      <br />
      <br />
      <TextField label="email" variant="filled" required onChange={handleChange} name="Email" value={input.Email} />
      <br />
      <br />
      <TextField label="password" variant="filled" required type="password" onChange={handleChange} name="Password" value={input.Password} />
      <br />
      <br />
      <Button variant='contained'onClick={addData} >Sign up</Button>
      <br/>
      <br/>
      <Typography variant='h7'>Already have an account? <a href="http://localhost:5173/login">Login</a></Typography>
      </div>
      
    </div>
  )
}


export default Signup
