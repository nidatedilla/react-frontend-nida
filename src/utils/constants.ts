const BASE_API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  USERS: `${BASE_API_URL}/users`,
  THREADS: `${BASE_API_URL}/threads`,
  INTERACTION:`${BASE_API_URL}/interactions`,
  LOGIN: `${BASE_API_URL}/auth/login`,
  REGISTER:`${BASE_API_URL}/auth/register`,
};
