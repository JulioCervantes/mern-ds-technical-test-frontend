import axios from 'axios';
import Auth from './auth';
import Category from './category';
import Topic from './topic';

const baseURL = import.meta.env.VITE_API_URL;

const clientConnection = axios.create({
  baseURL,
});

const client = {
  ...clientConnection,
  auth: Auth({client:clientConnection}),
  category: Category({client:clientConnection}),
  topic: Topic({client:clientConnection}),
};

export default client;