import axios from "axios";

const url = process.env.API_URL;

export const trackDetails = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${url}/track/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const trackSearch = async (keyword) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${url}/track/search`, {
      params: { keyword: keyword, limit: 50, offset: 0 },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
