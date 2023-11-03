import axios from "axios";

export const Server_URL = "http://localhost:5001";

const instanceApi = axios.create({
  withCredentials: true,
  baseURL: Server_URL,
});

instanceApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default instanceApi