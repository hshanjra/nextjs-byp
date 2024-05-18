import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
});

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default api;
