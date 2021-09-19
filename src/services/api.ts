import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const baseClient = axios.create({ baseURL: 'http://localhost:3000/api' });

export { apiClient, baseClient };
