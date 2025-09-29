export const BaseURL = import.meta.env.VITE_API_BASE_URL;
const auth = "/auth";
const events = "/events";
const attendance = "/attendance";
const admin = "/admin";

export const api_routes = {
  // auth apis
  login: `${auth}/login`,
  register: `${auth}/register`,
  authMe: `${auth}/me`,
  logout: `${auth}/logout`,
  // events apis
  events: `${events}`,
  // attendance apis
  eventAttendees: (id) => `${events}/${id}/attendees`,
  adminEventAttendees: (id) => `${admin}/events/${id}/attendees`,
  markAttendancePresent: (id) => `${attendance}/${id}/present`,
  attendancePresent: `${attendance}/present`,
  userEvents: (id) => `${events}/${id}/register`,
};
