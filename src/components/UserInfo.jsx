import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UserInfo = ({ username }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        backgroundColor: 'blue',
        padding: '0.5rem 1rem',
        borderRadius: '0 0.5rem 0 0', // Only the top right corner is rounded
        boxShadow: 1,
      }}
    >
      <Typography variant="body1" color="white">Logged in as: {username}</Typography>
    </Box>
  );
};

export default UserInfo;
