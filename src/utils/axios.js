import axios from "axios";

const baseUrl = process.env.API_URL;

// Create Axios instance
const AxiosService = axios.create({
  baseURL: baseUrl,
});

const setRequestHeaders = (config) => {
  // Add access token to the request
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    // Set the authorization header
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  // Set the content type
  config.headers["Content-Type"] = "application/json";
  config.withCredentials = true;
  return config;
};

const refreshTokenInterceptor = (error) => {
  // Handle errors
  if (
    error.response &&
    (error.response.data.error === "Invalid refresh token" ||
      error.response.data.error === "Refresh token not provided")
  ) {
    console.log("Invalid refresh token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUser");
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

const newAccessTokenInterceptor = (response) => {
  // Check if the response contains a new access token
  const newAccessToken = response.headers["new-access-token"];

  if (response.headers["new-access-token"]) {
    localStorage.setItem("accessToken", newAccessToken.split(" ")[1]);
  }
  return response;
};

AxiosService.interceptors.request.use(setRequestHeaders);
AxiosService.interceptors.response.use(
  (response) => response,
  refreshTokenInterceptor
);
AxiosService.interceptors.response.use(newAccessTokenInterceptor, (error) =>
  Promise.reject(error)
);

export default AxiosService;
