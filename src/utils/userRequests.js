import AxiosService from "./axios";

export const userSelfDetails = async (userId) => {
  try {
    const response = await AxiosService.get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const userInvitesReceived = async (userId, filter = {}) => {
  try {
    const response = await AxiosService.get(
      `/users/${userId}/invites/recieved`
    );
    const result = response.data.filter(
      (invite) => invite.status == filter.status
    );

    return result;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
