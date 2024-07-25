import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const navigate = useNavigate()

  const { authenticated, setAuthenticated, setUserId, userId } = useAuth();
  
  const handleLogout = () => {
    setAuthenticated(false)
    setUserId('')
    navigate('/')
    
    console.log("logging out")
  }
  return (
    <div >
      <Box  sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar >
        <Link to="/home">
          <img src="./images/logos.png" alt="logo" width="80px"  style={{ cursor: 'pointer' }}/>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bloggies Edge
          </Typography>
          
          {!authenticated && (<Button> <Link to={"/login"} style={{textDecoration:"none",color:"white"}}>Login</Link></Button>)}
          {authenticated && ( <Button color="inherit" onClick={handleLogout}>Logout</Button>)}
          {authenticated && ( <Button> <Link to={"/viewblog"} style={{textDecoration:"none",color:"white"}}>Blogs</Link></Button>)}
          {authenticated && (<Button><Link to={"/profile"} style={{textDecoration:"none",color:"white"}}>Profile</Link></Button>)}
          
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar