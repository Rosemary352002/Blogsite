import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Admin = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#b4c2cf',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    dashboard: {
      display: 'flex',
      alignItems: 'center',
      padding: '41px',
      backgroundColor: 'grey',
      color: '#fff',
      width: '94%',
    },
    profilePicture: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '20px',
    },
    button: {
      padding: '10px 20px',
      margin: '0 30px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'block',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10%',
    },
  };

  const [data, setData] = useState([]);
  const [showUserBlogs, setShowUserBlogs] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        if (userId) {
          const response = await axios.get('http://localhost:3040/viewbg', { params: { Email: userId } });
          setData(response.data);
        }
      } catch (error) {
        console.log("Error fetching user blogs:", error);
      }
    };
    fetchUserBlogs();
  }, [userId]);

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const handleShowUserBlogs = () => {
    setShowUserBlogs(true);
    setShowUsers(false);
  };

  const handleShowUsers = () => {
    setShowUsers(true);
    setShowUserBlogs(false);
  };

  const UsersContent = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3040/getuser')
        .then((response) => {
          console.log(response.data);
          setUserData(response.data.filter(user => user.Email !== userId));
        })
        .catch((error) => {
          console.log("error" + error);
        });
    }, []);

    const handleDelete = (userId) => {
      axios.delete(`http://localhost:3040/deleteuser/${userId}`)
        .then((response) => {
          console.log("user deleted");
          window.location.reload();
        })
        .catch((error) => {
          console.log("error" + error);
        });
    };

    return (
      <div>
        <br/>
        <br/>
        <Box display="flex">
          <TableContainer  component={Paper} sx={{ flexGrow: 2 }}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link className='custom-link' to={'/profile'}>
                        {user.FirstName}&nbsp;{user.LastName}
                      </Link>
                    </TableCell>
                    <TableCell>{user.Email}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <img
          src="./images/avatar1.jpg"
          alt="Profile"
          style={styles.profilePicture}
        />
        <Typography style={{ fontWeight: 'bold' }} variant='h6'>ADMIN</Typography>
        <div style={styles.buttonContainer}>
          <Button onClick={handleShowUserBlogs} style={styles.button}>View Blogs</Button>
          <Button onClick={handleShowUsers} style={styles.button}>View Users</Button>
        </div>
      </div>
      {showUserBlogs && (
        <div style={{ backgroundColor: '#f1f2e1' }}>
          <Typography style={{
            textAlign: 'center', fontSize: '32px',
            color: '#00796b',
            padding: '20px', fontFamily: '"Helvetica Neue", Arial, sans-serif', fontWeight: 'bold',
          }} variant='h2'>Popular Posts</Typography>
          <Grid style={{ marginLeft: '2%' }} container spacing={2}>
            {data.map((val, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Link to={`/blogdetail/${val._id}`} style={{ textDecoration: 'none' }} state={{ val: val }}>
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
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      {showUsers && <UsersContent />}
    </div>
  );
};

export default Admin;
