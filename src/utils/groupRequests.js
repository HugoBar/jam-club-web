import axios from 'axios';
const url = process.env.API_URL;

export const createGroup = async (name) => {
  try {
    const response = await axios.post(`${url}/group/`, {
      name,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserGroups = async () => {
  try {
    const response = await axios.get(`${url}/group/`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const acceptGroupInvite = async (groupId, inviteId) => {
  try {
    const response = await axios.post(`${url}/group/${groupId}/invite/${inviteId}/accept`);
    
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.message);
  }
};

export const rejectGroupInvite = async (groupId, inviteId, status) => {
  console.log(url)
  try {
    const response = await axios.post(`${url}/group/${groupId}/invite/${inviteId}/reject`, {
      status
    });

    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.message);
  }
};