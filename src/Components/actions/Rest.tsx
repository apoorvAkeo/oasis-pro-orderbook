import axios from 'axios';

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
    if(!tokens){
      let config = {
        'username': 'calvin@oasis.com',
        'password': 'password'
      };
      await axios.post('https://mengine.oasispromarkets.com/login', config).then((response) => {
          let newToken = response.data.access_token;
          window.localStorage.setItem('token', newToken);
          request!.headers!.Authorization = `Bearer ${newToken}`;
      }) 
    }
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
            if (err.response.status === 401) {
              setTimeout(() => {
              window.localStorage.removeItem('token')
              window.location.href = "/";
              }, 5000);    
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