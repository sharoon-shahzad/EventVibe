import { createSlice } from "@reduxjs/toolkit";

const persistedAuth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { user: null, token: null };

const initialState = {
  user: persistedAuth.user,
  token: persistedAuth.token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;

// selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) =>
  state.auth ? !!state.auth.token : undefined;
export default authSlice.reducer;
