import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (req) => {
    console.log("Start request", req);
    return req;
  },
  (err) => {
    console.log("Request Error", err);
    return Promise.reject(err.reject.data);
  }
);

apiService.interceptors.response.use(
  (res) => {
    console.log("Response", res);
    return res;
  },
  (err) => {
    console.log("Response Error", err);
    return Promise.reject(err.reject.data);
  }
);
export { apiService };
