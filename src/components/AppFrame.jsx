import React from 'react';
import { Outlet } from 'react-router-dom';
import UserInfo from './UserInfo'; // Import the UserInfo component
import { Container, AppBar, Toolbar, Typography } from '@mui/material';

const AppFrame = ({ loggedInUser }) => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Outlet /> {/* This will render the nested routes */}
      {loggedInUser && <UserInfo username={loggedInUser} />} {/* Render the UserInfo component */}
    </Container>
  );
};

export default AppFrame;
