import axios from 'axios';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
};
export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: false,
  ...config,
});

// api.interceptors.request.use((config) => {
//   if (typeof localStorage !== "undefined") {
//     let credentials: any = localStorage.getItem(AUTH_KEY)

//     if (credentials) {
//       credentials = JSON.parse(credentials)
//       if (credentials.jwt) {
//         config.headers.Authorization = `Bearer ${credentials.jwt}`
//       }
//     }
//   }
//   return config
// })
