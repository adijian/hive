import axios from 'axios';

const baseURL = `${window.location.protocol}//${window.location.host}`;

//console.log(baseURL)

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(
  config => {
    console.log("Request sent", config)
    return config;
  },
  error => {
    console.error("Request sent", error)
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    console.log("Response received", response)
    return response;
  },
  error => {
    console.error("Response received", error)
    return Promise.reject(error);
  }
);

export default instance;