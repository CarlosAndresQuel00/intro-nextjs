import axios from "axios";

// Axios instance
const api = axios.create({
  // Only necessary, don't recommend to use "eslint-disable-next-line"
  // eslint-disable-next-line no-undef
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default api;
