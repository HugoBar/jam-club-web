import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo'; // Import the UserInfo component
import { useAuth } from './AuthProvider';

function Home() {
  const { userId, accessToken } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        console.log('User details response:', response.data); // Add logging
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId, accessToken]);

  return (
    <div>
      <h1>Home Page</h1>
      
      {userDetails ? (
        <div>
          <UserInfo username={userDetails.username}/>
          <p>{userDetails.username}</p>
          <p>{accessToken}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Home;
