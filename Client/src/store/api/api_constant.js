export const BaseURL = import.meta.env.VITE_API_BASE_URL;
const auth = "/auth";
const events = "/events";

export const api_routes = {
  // auth apis
  login: `${auth}/login`,
  register: `${auth}/register`,
  authMe: `${auth}/me`,
  logout: `${auth}/logout`,
  // events apis
  events: `${events}`,
};
