import axios from 'axios';
const url = process.env.API_URL;

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const registerRequest = async (username, nickname, password, referralCode) => {
  console.log("registerRequest -> url", url)
  try {
    const response = await axios.post(`${url}/auth/register`, {
      username,
      nickname,
      password,
      referralCode
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
