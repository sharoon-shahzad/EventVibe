import { lazy } from "react";
import { getIcon } from "../helpers/iconsHelper";
import { LAYOUT_AUTH, LAYOUT_DASHBOARD, urls } from "./route-paths";
import { URL_Name } from "./url-names";
// components
const Home = lazy(() => import("@/Pages/Home/Home"));
const AuthPage = lazy(() => import("@/Pages/Auth/AuthPage"));

export const allRoutes = [
  {
    path: urls.Home,
    name: URL_Name.home,
    view: Home,
    layout: LAYOUT_DASHBOARD,
    icon: getIcon("home"),
    showInNavLinks: true,
    showInTopHeader: false,
  },
  {
    path: urls.Auth,
    name: URL_Name.auth,
    view: AuthPage,
    layout: LAYOUT_AUTH,
    icon: null,
  },
];

const authRoutes = allRoutes.filter((r) => r.layout === LAYOUT_AUTH);

const roleBaseRoute = {
  ["ADMIN"]: [urls.Home],
  ["USER"]: [urls.Home],
};

export const getAllowedRoutes = (userRole, isAuthenticated) => {
  if (!isAuthenticated) return authRoutes;
  const allowedRoutePaths = roleBaseRoute[userRole] || [];

  // Filter allRoutes to only include routes that are allowed for the user's role
  return allRoutes.filter((route) => allowedRoutePaths.includes(route.path));
};
