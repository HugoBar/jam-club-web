import AxiosService from "./axios";

export const createGroup = async (name) => {
  try {
    const response = await AxiosService.post(`/group/`, {
      name,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserGroups = async () => {
  try {
    const response = await AxiosService.get(`/group/`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getGroupById = async (groupId) => {
  try {
    const response = await AxiosService.get(`/group/${groupId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const inviteToGroup = async (groupId, username) => {
  try {
    const response = await AxiosService.post(`/group/${groupId}/invite`, {
      username,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const acceptGroupInvite = async (groupId, inviteId) => {
  try {
    const response = await AxiosService.post(
      `/group/${groupId}/invite/${inviteId}/accept`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const rejectGroupInvite = async (groupId, inviteId, status) => {
  try {
    const response = await AxiosService.post(
      `}/group/${groupId}/invite/${inviteId}/reject`,
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
    const response = await AxiosService.post(`}/group/${groupId}/remove`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
