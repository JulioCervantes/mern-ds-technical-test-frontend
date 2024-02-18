import axios from 'axios';
import Auth from './auth';
import Category from './category';
import Topic from './topic';
import Content from './content';

const baseURL = import.meta.env.VITE_API_URL;

const clientConnection = axios.create({
  baseURL,
});

export const setClientToken = (token) => {
  clientConnection.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const client = {
  ...clientConnection,
  auth: Auth({client:clientConnection}),
  category: Category({client:clientConnection}),
  topic: Topic({client:clientConnection}),
  content: Content({client:clientConnection}),
};

export default client;