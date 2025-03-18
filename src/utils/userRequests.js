import axios from "axios";

const url = process.env.API_URL;
const token = localStorage.getItem("accessToken");

export const userSelfDetails = async (userId) => {
  try {
    console.log("entrou no userSelfDetails", token)
    const response = await axios.get(`${url}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("isto deu erro")
    throw new Error(error.response.data.error);
  }
};

export const userInvitesReceived = async (userId, filter = {}) => {
  try {
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
