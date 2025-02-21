import axios from 'axios';

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
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
    const response = await axios.post('http://localhost:3000/auth/register', {
      username,
      nickname,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
