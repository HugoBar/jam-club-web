import axios from "axios";
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

export const getGroupById = async (groupId) => {
  try {
    const response = await axios.get(`${url}/group/${groupId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const inviteToGroup = async (groupId, username) => {
  try {
    const response = await axios.post(`${url}/group/${groupId}/invite`, {
      username,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const acceptGroupInvite = async (groupId, inviteId) => {
  try {
    const response = await axios.post(
      `${url}/group/${groupId}/invite/${inviteId}/accept`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const rejectGroupInvite = async (groupId, inviteId, status) => {
  try {
    const response = await axios.post(
      `${url}/group/${groupId}/invite/${inviteId}/reject`,
      {
        status,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeFromGroup = async (groupId, userId) => {
  try {
    const response = await axios.post(`${url}/group/${groupId}/remove`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
