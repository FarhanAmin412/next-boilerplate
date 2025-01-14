import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const token =
      process.env.NEXT_PUBLIC_API_AUTH_TOKEN || localStorage.getItem("token"); // Or use any other method to get the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
