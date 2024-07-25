import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage when the AuthProvider mounts
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('UserId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    
    if (storedLoginStatus === 'true') {
      setAuthenticated(true);
      setUserId(storedUserId);
      console.log("logged in auth context");
      console.log("USERNAME = " + storedUserId);
    }
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      // Your login logic here
      const storedUserId = localStorage.getItem('UserId');
      const storedPassword = localStorage.getItem('password');

      axios.get('http://localhost:3040/view', { params: { Email: userId } })
        .then((response) => {
          const email = response.data.Email;
          const password = response.data.Password;
          console.log(response.data);
          console.log(email);

          if (email === userId || storedUserId) {
            console.log("email matched");
            if (response.data.Password === password || storedPassword) {
              console.log("password matched");
              setAuthenticated(true);
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('UserId', response.data.Email);
              localStorage.setItem('password', response.data.Password);
              
              setUserId(email);
              console.log(response.data.role);
              if (response.data.role === 'user') {
                setIsAdmin(false);
                console.log("it is a user");
                navigate('/'); 
              } else {
                setIsAdmin(true);
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin');
              }
            } else {
              console.log("password not matched");
            }
          } else {
            console.log("email not matched");
          }
        })
        .catch((error) => {
          console.log("error" + error);
        })
        .finally(() => {
          setSubmitted(false);
        });
    }
  }, [submitted, userId, navigate]);

  const login = (email, password) => {
    setUserId(email);
    console.log("login using authcontext");
    setSubmitted(true);
  };

  const logout = () => {
    setAuthenticated(false);
    setUserId('');
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('UserId');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('password');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, userId, setUserId, isAdmin, setIsAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
