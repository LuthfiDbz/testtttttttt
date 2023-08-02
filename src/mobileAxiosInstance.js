import axios from "axios";

const mobileAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_CUST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

mobileAxiosInstance.interceptors.request.use((config) => {
  const auth = sessionStorage.getItem("token");
  config.headers.Authorization = `${auth}`;
  return config;
});

mobileAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response);
    }
    throw error;
  }
);

export default mobileAxiosInstance;
