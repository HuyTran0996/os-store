import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`;

const apiService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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
    if (err.response?.data?.message === "Please log in to get access") {
      localStorage.setItem(
        "adminData",
        JSON.stringify({ note: "Your Section Is Expired" })
      );
    }

    return Promise.reject(err.response.data);
  }
);

export { apiService, BASE_URL };
