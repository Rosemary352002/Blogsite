
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Home = () => {
  const backgroundStyle = {
    backgroundImage: 'url("./images/background.jpg")',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    color: 'rgb(43, 105, 147)',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '3em',
    marginBottom:'10%'
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
   
    transition: 'background-color 0.3s ease',
  };
  const coloredBackgroundStyle = {
    backgroundColor: '#65b9c9', 
    padding: '50px 0',
    textAlign: 'left',
    
  };
  const newcoloredBackgroundStyle = {
    backgroundColor: '#e1e6e2', 
    padding: '50px 0',
    textAlign: 'center',
    
  };
  const imgStyle={
    display:'flex',
    margin:'10%',
    gap:'10%',
    
  }
  const footerStyle={
    backgroundColor: '#1a6fc9', 
    padding: '20px',
    borderTop: '1px solid #e7e7e7',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
  }
  const sectionStyle = {
    
    margin: '0 170px',
  };

  const headinglastStyle = {
    fontSize: '1.5em',
    marginBottom: '10px',
    color:'white'
  };

    const logged = true;
    const {authenticated, userId} = useAuth();

    console.log("use:",userId)
  return (
    <>
    <div style={backgroundStyle}>
      <h1 style={headingStyle}>Turn your ideas into engaging stories</h1>
      {authenticated && (<Button variant="contained" style={buttonStyle}><Link to={"/addblog"} style={{textDecoration:"none",color:"white"}}>Create your Blog</Link></Button>)}
    </div>
    <div style={coloredBackgroundStyle}>
    
    <h1 style={{fontFamily: 'Georgia, serif', 
   textAlign:"center"}}>Make your perfect design</h1>
    <p style={{width: '600px', 
    margin: '20px', 
    paddingLeft: '28%',
    fontFamily: 'Arial, sans-serif'}}>Create a stunning blog that reflects your unique style. Select from a variety of user friendly templates featuring flexible layouts and a vast collection of background images, or craft your own custom design.</p>
    <div style={imgStyle}>
    <img style={{width:'500px'}} src="./images/travel.png" alt="template" />
    <img style={{width:'500px'}} src="./images/Neve-Theme-with-Food-Design.png" alt="temp" />
  
    </div>
    </div>
    <div style={newcoloredBackgroundStyle}>
    <img style={{width:'400px'}} src="./images/memory.jpg" alt="temp" />
    <h1 style={{fontFamily: 'Georgia, serif', 
    marginLeft: '20px'}}>Keep your memories close</h1>
    <p style={{width: '600px', 
    margin: '20px', 
    paddingLeft: '28%',
    fontFamily: 'Arial, sans-serif'}}>Preserve the moments that matter. With Bloggies edge, you can securely store thousands of posts, photos, and more.</p>
    
    </div>
    <footer style={footerStyle}>
    <div style={sectionStyle}>
    <h4 style={headinglastStyle}>Contact Us</h4>
        <p style={{color:'white'}}>Email: bloggiesedge@gmail.com</p>
        <p style={{color:'white'}}>Phone: +123 456 7890</p>
        <p style={{color:'white'}}>Address: LaSalle Street, Chicago, USA</p>
    </div>
    <div style={sectionStyle}>
      <h4 style={headinglastStyle}>Popular Features</h4>
        <ul>
          <p style={{color:'white'}}>Creates Blogs</p>
          <p style={{color:'white'}}>View Blogs</p>
          <p style={{color:'white'}}>Update Blogs</p>
          <p style={{color:'white'}}>Delete Blogs</p>
        </ul>
      </div>
      </footer>
  </>
  );
};

export default Home;
