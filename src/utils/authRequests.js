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

export const registerRequest = async (username, nickname, password) => {
  try {
    const response = await axios.post(`${url}/auth/register`, {
      username,
      nickname,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
