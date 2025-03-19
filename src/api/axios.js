import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT,
  headers: {
    'Content-Type': 'application/json'
  }
});
export default instance;
