import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiService, axiosBaseQuery, BASE_URL } from "../../app/apiService";

//Note: To set a cookie in the browser when fetching data with Axios, use withCredentials: true. When using fetchBaseQuery in Redux, set credentials: 'include'. In an application, you can choose either Axios or fetchBaseQuery for data fetching, but it's generally recommended to use only one to avoid inconsistencies.

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  // baseQuery: axiosBaseQuery(),
  endpoints(builder) {
    return {
      loginAdmin: builder.mutation({
        query: (user) => {
          return {
            url: "/auth/loginAdmin",
            method: "POST",
            body: {
              email: user.email,
              password: user.password,
            },
          };
        },
      }),
    };
  },
});

export const { useLoginAdminMutation } = usersApi;
export { usersApi };
