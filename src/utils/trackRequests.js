import axios from 'axios';
const url = process.env.API_URL;

export const trackDetails = async () => {
  try {
    const response = await axios.get(`${url}/track/`);
    console.log("response.data")
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.error);
  }
};
