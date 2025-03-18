import axios from "axios";

const url = process.env.API_URL;

export const userSelfDetails = async (userId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${url}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const userInvitesReceived = async (userId, filter = {}) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${url}/users/${userId}/invites/recieved`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data.filter(
      (invite) => invite.status == filter.status
    );

    return result;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
