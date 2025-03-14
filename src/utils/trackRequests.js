import axios from 'axios';
const url = process.env.API_URL;

export const trackDetails = async () => {
  try {
    const response = await axios.get(`${url}/track/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const trackSearch = async (keyword) => {
  try {
    const response = await axios.get(`${url}/track/search`, {params: {keyword: keyword, limit: 50, offset: 0}, });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
