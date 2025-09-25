import { lazy } from "react";
import { getIcon } from "../helpers/iconsHelper";
import { LAYOUT_DASHBOARD, urls } from "./route-paths";
import { URL_Name } from "./url-names";
// components
const Home = lazy(() => import("@/Pages/Home/Home"));

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
];

export const allowedRoutes = () => {
  return allRoutes;
};
