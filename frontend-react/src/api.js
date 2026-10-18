import axios from 'axios';

// Uses VITE_API_URL env var in production, falls back to localhost in development
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export default API;
