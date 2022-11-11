import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://api.bakarya.com/api",
  headers: {
    "Content-type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  // const accessToken = // get from cookies
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }

  return config;
});

axios.interceptors.response.use((response) => {
  // return response.data;
});

export default httpClient;
