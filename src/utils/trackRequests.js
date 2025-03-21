import AxiosService from "./axios";

export const trackDetails = async () => {
  try {
    const response = await AxiosService.get(`/track/`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const trackSearch = async (keyword) => {
  try {
    const response = await AxiosService.get(`/track/search`, {
      params: { keyword: keyword, limit: 50, offset: 0 },
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
