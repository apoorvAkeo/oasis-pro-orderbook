import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ApiUrl } from '../Helpers/Constants';
let tokens = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const axiosInstance = axios.create({
  // env file base url
  baseURL: 'https://mengine.oasispromarkets.com/',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${tokens}`
  }
});
  //interceptor setup
  axiosInstance.interceptors.request.use(async function (request) {
    tokens = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    request!.headers!.Authorization = `Bearer ${tokens}`;
    // if(!tokens){
    //   let config = {
    //     'username': 'crosbycalvin@gmail.com',
    //     'password': 'password'
    //   };
    //   const params = new URLSearchParams(config);
    //   let headers = {
    //     headers : {
    //       'Content-Type' : 'application/x-www-form-urlencoded'
    //     }
    //   }
    //   await axios.post('https://mengine.oasispromarkets.com/login', params, headers).then((response) => {
    //       let newToken = response.data.access_token;
    //       window.localStorage.setItem('token', newToken);
    //       request!.headers!.Authorization = `Bearer ${newToken}`;
    //   }) 
    // }
    //console.log("intercpe");
    return Promise.resolve(request);
  }, function (error) {
    return Promise.reject(error);
  });

  // after getting response
  axiosInstance.interceptors.response.use(function (response) {
    if(response && response.data)
    return response.data;
  },
  async (err) => {
    if (err) {
          if (err.response) {
            console.log("response",err.response);
            console.log(tokens);
            console.log(window.location.pathname);
            if ((err.response.status === 401 || tokens == null) && window.location.pathname !== '/login') {
              window.localStorage.removeItem('token');
              window.localStorage.removeItem('loggedIn');
              window.location.href = ApiUrl.login;   
            }
          }
        } else {
          return Promise.reject({ error: 'Network Error' });
        }
      }
  );
  
const restActions = {
  GET: (url:any) => {
    return axiosInstance.get(url);
  },
  POST: (url:any, data:any, config:any=null) => {
    return axiosInstance.post(url, data, config);
  },
  DELETE: (url:any) => {
    return axiosInstance.delete(url);
  }
};

export default restActions;