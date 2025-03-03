import axios from "axios";
const url = process.env.API_URL;

export const createUserRecommendation = async (groupId, spotifyId) => {
  try {
    const response = await axios.post(
      `${url}/group/${groupId}/recommendation`,
      {
        spotifyId,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getGroupRecommendations = async (groupId) => {
  try {
    const response = await axios.get(`${url}/group/${groupId}/recommendation`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getGroupRecommendationByUser = async (groupId) => {
  try {
    const response = await axios.get(
      `${url}/group/${groupId}/recommendation/by_user`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
