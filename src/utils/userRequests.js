import axios from 'axios';

export const userSelfDetails = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.error);
  }
};
