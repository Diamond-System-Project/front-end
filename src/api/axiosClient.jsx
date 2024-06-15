// axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { ACCESS_TOKEN } from "../constant/constant";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Handle token expiration or unauthorized access
      localStorage.removeItem(ACCESS_TOKEN);
      // Redirect to login page or show a message
      window.location.href = "/login"; // Example of redirecting to login page
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
