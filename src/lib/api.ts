import axios from "axios";

export const extApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

extApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
      errorCode: error.code || null,
    };
    return Promise.reject(customError);
  },
);

const isServer = typeof window === "undefined";

// inject token to request
extApi.interceptors.request.use((config) => {
  if (isServer) {
    const { cookies } = require("next/headers");

    const token = cookies().get("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }

    return config;
  }
  return config;
});

export const intApi = axios.create({
  baseURL: "/api",
});
