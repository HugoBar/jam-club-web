import AxiosService from "./axios";

export const loginRequest = async (username, password) => {
  try {
    const response = await AxiosService.post(`/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const registerRequest = async (
  username,
  nickname,
  password,
  referralCode
) => {
  try {
    const response = await AxiosService.post(`/auth/register`, {
      username,
      nickname,
      password,
      referralCode,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
