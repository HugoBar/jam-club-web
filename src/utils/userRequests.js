import axios from 'axios';
const url = process.env.API_URL;

export const userSelfDetails = async (userId) => {
  try {
    const response = await axios.get(`${url}/users/${userId}`);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};


export const userInvitesReceived = async (userId, filter = {}) => {
  try {
    const response = await axios.get(`${url}/users/${userId}/invites/recieved`);
    const result = response.data.filter(invite => invite.status == filter.status)

    return result;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
