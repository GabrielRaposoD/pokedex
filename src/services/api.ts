import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKEAPI_API_URL,
});

const baseClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export { apiClient, baseClient };
