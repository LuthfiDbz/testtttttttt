import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DEV_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Set the AUTH token (put from localStorage) for any request
axiosInstance.interceptors.request.use((config) => {
  const auth = sessionStorage.getItem("token");
  config.headers.Authorization = `Bearer ${auth}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response)
    }
  }
);

export default axiosInstance;
