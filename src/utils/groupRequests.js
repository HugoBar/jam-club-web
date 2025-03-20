import axios from "axios";

const url = process.env.API_URL;

export const createGroup = async (name) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${url}/group/`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserGroups = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${url}/group/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getGroupById = async (groupId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${url}/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const inviteToGroup = async (groupId, username) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${url}/group/${groupId}/invite`,
      {
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const acceptGroupInvite = async (groupId, inviteId) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token)
    const response = await axios.post(
      `${url}/group/${groupId}/invite/${inviteId}/accept`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const rejectGroupInvite = async (groupId, inviteId, status) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${url}/group/${groupId}/invite/${inviteId}/reject`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeFromGroup = async (groupId, userId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${url}/group/${groupId}/remove`,
      {
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
