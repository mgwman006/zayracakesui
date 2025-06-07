import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://127.0.0.1:8080/api/v1',
  baseURL:'https://zayracakesapi-706081124104.africa-south1.run.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;
