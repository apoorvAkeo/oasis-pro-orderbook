import axios from 'axios';

const axiosInstance = axios.create({
  // env file base url
  baseURL: 'https://api.github.com/users',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const restActions = {
  GET: (url:any, config:any) => {
    return axiosInstance.get(url, config);
  },
  POST: (url:any, data:any, config:any) => {
    return axiosInstance.post(url, data, config);
  },
  DELETE: (url:any) => {
    return axiosInstance.delete(url);
  },
  SETUP: (url:any) => {

    axiosInstance.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });

  }
};

export default restActions;