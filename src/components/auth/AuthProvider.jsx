import React, { createContext, useState, useContext, useEffect } from 'react';
import AxiosService from '../../utils/axios';
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

    AxiosService.interceptors.response.eject(responseInterceptor);

    navigate('/login');
  };

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
