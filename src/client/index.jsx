import axios from 'axios';
import Auth from './auth';

const baseURL = import.meta.env.VITE_API_URL;
console.log('API_URL:', baseURL);

const clientConnection = axios.create({
  baseURL,
});

const client = {
  ...clientConnection,
  auth: Auth({client:clientConnection}),
};

export default client;