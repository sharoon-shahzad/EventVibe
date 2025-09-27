import { api_routes } from "../api_constant";
import apiSlice from "../apiSlice";
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register
    registerUser: builder.mutation({
      query: ({ payload }) => ({
        url: `${api_routes.register}`,
        method: "POST",
        body: payload,
      }),
    }),
    // login
    loginUser: builder.mutation({
      query: ({ payload }) => ({
        url: `${api_routes.login}`,
        method: "POST",
        body: payload,
      }),
    }),
    // logout
    logoutUser: builder.mutation({
      query: () => ({
        url: `${api_routes.logout}`,
        method: "POST",
      }),
    }),
    // get user
    getUser: builder.query({
      query: () => ({
        url: `${api_routes.authMe}`,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
} = authApiSlice;
