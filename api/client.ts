// src/api/client.ts
import axios from "axios";
import Constants from "expo-constants";

const TMDB_API_KEY = Constants.expoConfig?.extra?.TMDB_API_KEY;

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

apiClient.interceptors.request.use(
  function (config) {
    console.log("request:", config.url, config.params);
    return config;
  },
  function (error) {
    console.log("request error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    if (response.status !== 200) {
      console.log("response status:", response.status);
    }
    return response;
  },
  function (error) {
    console.log("response error:", error);
    return Promise.reject(error);
  }
);
