import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Addblog = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  const [take, setTake] = useState({
    title: '',
    bloggername: '',
    Email: '',
    content: '',
    Image: ''
  });

  useEffect(() => {
    if (location.state && location.state.val) {
      setTake(location.state.val);
      setIsEditing(true);
    } else {
      fetchUserDetails();
    }
  }, [location.state]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3040/view', { params: { Email: userId } });
      console.log("Data received", response.data);
      setTake(prevState => ({
        ...prevState,
        bloggername: response.data.bloggername,
        Email: response.data.Email,
        // Assuming these fields are part of the response data:
        content: response.data.content || '',
        Image: response.data.Image || ''
      }));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  console.log(isEditing);
  console.log(take);

  const handlePublish = async (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:3040/edit/${take._id}` : 'http://localhost:3040/addbg';
    const method = isEditing ? axios.put : axios.post;

    try {
      const response = await method(url, take);
      console.log(response.data);
      console.log(isEditing ? "Blog updated" : "Blog data added", take);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTake(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const backgroundStyle = {
    backgroundImage: 'url("./images/createblog.png")',
    backgroundSize: 'cover',
    padding: '5px 0',
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '2% 30%',
      padding: '22px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#e5ebe4'
    },
    heading: {
      textAlign: 'left',
      color: '#333',
      padding: '5px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
      color: '#555',
    },
    input: {
      width: '96%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    textarea: {
      width: '95%',
      padding: '10px',
      height: '100px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      background: '#5cb85c',
      color: '#fff',
      cursor: 'pointer',
      alignSelf: 'flex-start',
    },
  };

  return (
    <>
      <div style={backgroundStyle}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Create New Blog</h2>
          <form onSubmit={handlePublish} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Title:</label>
              <input
                type="text"
                name="title"
                value={take.title}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Blogger Name:</label>
              <input
                type="text"
                name="bloggername"
                value={take.bloggername}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="text"
                name="Email"
                value={take.Email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Content:</label>
              <textarea
                name="content"
                value={take.content}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Image url:</label>
              <input
                type="text"
                name="Image"
                value={take.Image}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <Button type="submit" style={styles.button}>Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addblog;
