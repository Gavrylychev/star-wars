import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://swapi.co/api/',
  responseType: 'json'
});
