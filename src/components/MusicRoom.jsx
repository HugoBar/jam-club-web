import React, { useState, useEffect } from 'react';
import { getGroupById } from '../utils/groupRequests';
import { useLocation } from "react-router-dom";
import { Box, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MusicRoom = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const groupId = location.state?.groupId; 

  const fetchGroup = async (groupId) => {
    try {
      console.log('Fetching group details:', groupId);
      const response = await getGroupById(groupId);
      console.log(response)
      setGroup(response);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching user details:', error);
      setGroup(null); 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchGroup(groupId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 1000, 
      margin: '0 auto', 
      paddingTop: "5%", 
      display: 'flex', 
      alignItems: 'center',
    }}>
      <ArrowBackIcon 
        sx={{ cursor: 'pointer', marginRight: 1, marginTop: 4 }} 
        onClick={() => window.history.back()} 
      />
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'left', marginTop: 4 }}>
        {group.name}
      </Typography>
    </Box>
    
  );
}

export default MusicRoom;
