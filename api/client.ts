// src/api/client.ts
import axios from 'axios';
import Constants from 'expo-constants';

const TMDB_API_KEY = Constants.expoConfig?.extra?.TMDB_API_KEY;

export const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TMDB_API_KEY}`,
  },
});