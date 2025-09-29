import { lazy } from "react";
import { getIcon } from "../helpers/iconsHelper";
import { LAYOUT_AUTH, LAYOUT_DASHBOARD, urls } from "./route-paths";
import { URL_Name } from "./url-names";
import { UserRole } from "../enums/useRole";
// components
const Home = lazy(() => import("@/Pages/Home/Home"));
const AuthPage = lazy(() => import("@/Pages/Auth/AuthPage"));
const CreateEvent = lazy(() => import("@/Pages/Events/CreateEvent"));
const EventDetail = lazy(() => import("@/Pages/Events/EventDetail"));
const Profile = lazy(() => import("@/Pages/Profile/Profile"));
const MyEvents = lazy(() => import("@/Pages/MyEvents/MyEvents"));

export const allRoutes = [
  {
    path: urls.Home,
    name: URL_Name.home,
    view: Home,
    layout: LAYOUT_DASHBOARD,
    showInNavLinks: true,
    showInTopHeader: false,
  },
  {
    path: urls.CreateEvent,
    name: URL_Name.createEvent,
    view: CreateEvent,
    layout: LAYOUT_DASHBOARD,
  },
  {
    path: urls.EventDetail,
    name: URL_Name.eventDetail,
    view: EventDetail,
    layout: LAYOUT_DASHBOARD,
  },
  {
    path: urls.Auth,
    name: URL_Name.auth,
    view: AuthPage,
    layout: LAYOUT_AUTH,
    icon: null,
  },
  {
    path: urls.Profile,
    name: URL_Name.profile,
    view: Profile,
    layout: LAYOUT_DASHBOARD,
  },
  {
    path: urls.MyEvents,
    name: URL_Name.myEvents,
    view: MyEvents,
    layout: LAYOUT_DASHBOARD,
  },
];

const authRoutes = allRoutes.filter((r) => r.layout === LAYOUT_AUTH);

const roleBaseRoute = {
  [UserRole.admin]: [
    urls.Home,
    urls.CreateEvent,
    urls.EventDetail,
    urls.Profile,
    urls.MyEvents,
  ],
  [UserRole.user]: [urls.Home, urls.EventDetail, urls.Profile, urls.MyEvents],
};

export const getAllowedRoutes = (userRole, isAuthenticated) => {
  if (!isAuthenticated) return authRoutes;
  const allowedRoutePaths = roleBaseRoute[userRole] || [];

  // Filter allRoutes to only include routes that are allowed for the user's role
  return allRoutes.filter((route) => allowedRoutePaths.includes(route.path));
};
