import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button } from '@mui/material';

const Blogdetail = () => {
  const styles = {
    pageContainer: {
      backgroundColor: '#cffaf0',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '5%',
    },
    image: {
      width: '50%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    heading: {
      fontSize: '32px',
      color: '#00796b',
      margin: '20px 0',
    },
    metaData: {
      fontSize: '14px',
      color: '#757575',
      marginBottom: '20px',
    },
    contents: {
      fontSize: '18px',
      color: '#424242',
      marginBottom: '20px',
    },
    buttonContainer: {
      display: 'flex',
      
      marginTop: 'auto',
    },
    actionButton: {
      backgroundColor: '#4caf50',
      color: '#fff',
      marginRight: '10px',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: '#fff',
    },
  };

  const { userId,isAdmin } = useAuth();
  const [editUser, setEditUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      console.log("blogpage data", location.state.val);
      if (location.state.val.Email === userId) {
        setEditUser(true);
        console.log("Author of the post");
      }
    } else {
      console.log("No post data found");
    }
  }, [location.state, userId]);

  const handleUpdate = (val) => {
    console.log("update data:", val);
    navigate('/addblog', { state: { val} });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3040/remove/${id}`);
      navigate('/profile');
    } catch (error) {
      console.error("Error in delete:", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {location.state && (
        <>
          <h1 style={styles.heading}>{location.state.val.title}</h1>
          <img
            src={location.state.val.Image}
            alt="Blog Visual"
            style={styles.image}
          />
          <br />
          <div>
            <p style={styles.metaData}>Date: {new Date().toLocaleDateString()} | Blogger: {location.state.val.bloggername}</p>
            <p style={styles.contents}>{location.state.val.content}</p>
          </div>
          {(editUser || isAdmin) && (
            <div style={styles.buttonContainer}>
              <Button onClick={()=>handleUpdate(location.state.val)}style={styles.actionButton}>Update</Button>
              <Button onClick={() => handleDelete(location.state.val._id)} style={styles.deleteButton}>Delete</Button>
            </div>
          )}
          
        </>
      )}
    </div>
  );
};

export default Blogdetail;
