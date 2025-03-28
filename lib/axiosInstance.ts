import axios from "axios";
import { getStrapiURL } from "@/lib/utils";
import { fetchAuthToken } from "@/lib/authToken";

const axiosInstance = axios.create({
  baseURL: getStrapiURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await fetchAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
