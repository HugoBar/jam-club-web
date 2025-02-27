import React from 'react';
import { Box } from '@mui/material';
import DailyTrack from './tracks/DailyTrack';
import GroupList from './groups/GroupList';

function Home() {
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, margin: '0 auto', paddingTop: "5%" }}>
      <DailyTrack />

      <GroupList />
    </Box>
  );
}

export default Home;
