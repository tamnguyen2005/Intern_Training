import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error?.response?.data || error.message);
  },
);
export default api;
