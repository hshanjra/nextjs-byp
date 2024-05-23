import axios from "axios";

export const extApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const intApi = axios.create({
  baseURL: "/api",
});
