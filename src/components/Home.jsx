import React from 'react';
import { Box } from '@mui/material';
import DailyTrack from './DailyTrack';
import GroupList from './GroupList';

function Home() {
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      <DailyTrack />

      <GroupList />
    </Box>
  );
}

export default Home;
