import AxiosService from "./axios";

export const createUserRecommendation = async (groupId, spotifyId) => {
  try {
    const response = await AxiosService.post(
      `/group/${groupId}/recommendation`,
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
    const response = await AxiosService.get(`/group/${groupId}/recommendation`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getGroupRecommendationByUser = async (groupId) => {
  try {
    const response = await AxiosService.get(
      `/group/${groupId}/recommendation/by_user`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
