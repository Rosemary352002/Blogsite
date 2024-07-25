import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
    },
    dashboard: {
      width: '250px',
      backgroundColor: '#728f83',
      color: '#fff',
      padding: '20px',
    },
    profileSection: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#d8ebea',
    },
    profilePicture: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '1% 30%',
    },
    profileName: {
      marginTop: '2px',
      fontSize: '24px',
      textAlign: 'center',
      color: 'white',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '10px',
      marginTop: '12%',
      backgroundColor: '#e2e8ca',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      textAlign: 'center',
    },
  };

  
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState("Guest");
  const [lname, setLname] = useState("User");
  const [userBlogs, setUserBlogs] = useState([]);
  const [data, setData] = useState([]);
  const [showUserBlogs, setShowUserBlogs] = useState(false); // State to track if user blogs should be shown
  const navigate = useNavigate()

  const { authenticated, setAuthenticated, setUserId, userId } = useAuth();
  
  const handleLogout = () => {
    setAuthenticated(false)
    setUserId('')
    navigate('/')
    
    console.log("logging out")
  }
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3040/view`, { params: { Email: userId } });
          setProfileData(response.data);
          setName(response.data.FirstName);
          setLname(response.data.LastName);
        } catch (error) {
          console.log("Error fetching profile data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        if (userId) {
          const response = await axios.get('http://localhost:3040/viewbguser', { params: { Email: userId } });
          setData(response.data);
          setUserBlogs(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.log("Error fetching user blogs:", error);
        setUserBlogs([]);
      }
    };
    fetchUserBlogs();
  }, [userId]);

  const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  };

  const handleShowUserBlogs = () => {
    setShowUserBlogs(true); // Set state to true when "My Blogs" button is clicked
  };

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <img
          src="./images/avatar1.jpg"
          alt="Profile"
          style={styles.profilePicture}
        />
        <h2 style={styles.profileName}>{name} {lname}</h2>
        <br />
        <Button style={styles.button} onClick={handleShowUserBlogs}>My Blogs</Button>
        {authenticated && ( <Button style={styles.button} onClick={handleLogout}>Logout</Button>)}
      </div>
      <div style={styles.profileSection}>
        <Typography style={{ textAlign: 'center', fontSize: '32px', color: '#00796b', padding: '20px', fontFamily: '"Helvetica Neue", Arial, sans-serif', fontWeight: 'bold' }} variant='h2'>Popular Posts</Typography>
        <Grid style={{ marginLeft: '2%' }} container spacing={2}>
          {showUserBlogs && userBlogs.map((val, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Link to={`/blogdetail/${val._id}`} style={{textDecoration:'none'}} state={{ val: val }}>
                <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    sx={{ height: 150 }}
                    component="img"
                    image={val.Image}
                    title="img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {val.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {truncate(val.content, 50)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* Additional actions if needed */}
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
