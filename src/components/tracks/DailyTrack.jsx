import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { trackDetails } from '../../utils/trackRequests';
import placeholder from '../assets/track-placeholder.png';

function DailyTrack() {
  const [track, setTrack] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const fetchTrack = async () => {
    try {
      const response = await trackDetails();
      setTrack(response);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching user details:', error);
      setTrack(null); 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTrack();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, minHeight: 182, display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
        Jam do Dia
      </Typography>
      <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, width: '100%' }}>
        {track ? (
          <>
            <CardMedia
              component="img"
              sx={{ width: 150, height: 150 }}
              image={track.cover[0].url} 
              alt="Album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 2 }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {track.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {track.artists.join(', ')}
                </Typography>
              </CardContent>
            </Box>
          </>
        ) : (
          <>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150 }}
            image={placeholder} 
            alt="Album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 2 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {"Música Desconhecida"}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {"Artista Desconhecido"}
              </Typography>
            </CardContent>
          </Box>
        </>
        )}
      </Card>
    </Box>
  );
}

export default DailyTrack;
