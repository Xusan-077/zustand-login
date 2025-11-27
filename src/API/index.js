import axios from "axios";

export const API = axios.create({
  baseURL: "https://faq-crud.onrender.com/api",
});

export const DUMMY_API = axios.create({
  baseURL: "https://dummyjson.com",
});

DUMMY_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
