import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authReducer from "./slice/authSlice";
import eventReducer from "./slice/eventSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
