import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 90000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
