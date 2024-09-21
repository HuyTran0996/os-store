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
      alert("Your Section Is Expired, Please Login Again");
      window.location.href = "/login";
    }
    return Promise.reject(err.response.data);
  }
);

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await apiService({
        url: BASE_URL + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export { apiService, axiosBaseQuery, BASE_URL };
