import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import UserInfo from './UserInfo'; 
import { userSelfDetails } from '../../utils/userRequests';

const AppFrame = () => {
  const [userDetails, setUserDetails] = useState(null);
  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userSelfDetails(loggedInUser);
        setUserDetails(response);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    if (loggedInUser) {
      fetchUserDetails();
    }
  }, [loggedInUser]);

  return (
    <Container>
      <Outlet /> 
      {loggedInUser && <UserInfo data={userDetails} />}
    </Container>
  );
};

export default AppFrame;
