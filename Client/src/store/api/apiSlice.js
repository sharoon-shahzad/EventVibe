import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "./api_constant";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
export default apiSlice;
