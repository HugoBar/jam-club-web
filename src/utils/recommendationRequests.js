import axios from "axios";

const url = process.env.API_URL;

export const createUserRecommendation = async (groupId, spotifyId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${url}/group/${groupId}/recommendation`,
      {
        spotifyId,
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

export const getGroupRecommendations = async (groupId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${url}/group/${groupId}/recommendation`, {
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

export const getGroupRecommendationByUser = async (groupId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${url}/group/${groupId}/recommendation/by_user`,
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
