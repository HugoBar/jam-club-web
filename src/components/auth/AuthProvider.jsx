import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

let responseInterceptor;

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const login = (userId, accessToken) => {
    setLoggedInUser(userId);
    setAccessToken(accessToken);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('loggedInUser', userId);
  };

  const logout = () => {
    setLoggedInUser(null);
    setAccessToken(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedInUser');

    axios.interceptors.response.eject(responseInterceptor);

    navigate('/login');
  };


  // Add Axios response interceptor to handle token refresh
  useEffect(() => {
    responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Check if the response contains a new access token
        if (response.headers['new-access-token']) {
          setAccessToken(response.headers['new-access-token']);
          localStorage.setItem('accessToken', response.headers['new-access-token']);
        }
        return response;
      },
      (error) => {
        // Handle errors
        if (error.response && (
          error.response.data.error === 'Invalid refresh token' || 
          error.response.data.error === 'Refresh token not provided'
        )) {
          logout();
        }
        return Promise.reject(error);
      }
    );
  }, [logout]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
