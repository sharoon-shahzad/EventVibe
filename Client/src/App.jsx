import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { getAllowedRoutes } from "./utils/routes/routes";
import {
  LAYOUT_DASHBOARD,
  LAYOUT_AUTH,
  urls,
} from "./utils/routes/route-paths";
import { H1 } from "./components/Atoms/Shared/headings";
import Loader from "./components/Atoms/Loader/Loader";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "./store/slice/authSlice";
const AuthPage = lazy(() => import("./Pages/Auth/AuthPage"));

export default function App() {
  const currentUser = useSelector(selectCurrentUser);
  const userRole = currentUser?.role;
  const isAuthenticated = useSelector(selectIsAuthenticated) || false;
  const routes = getAllowedRoutes(userRole, isAuthenticated);
  const publicRedirectPath = LAYOUT_AUTH;
  const dashboardLinks = routes.filter((r) => r.layout === LAYOUT_DASHBOARD);
  const navLinks = routes.filter((r) => r.showInNavLinks);

  return (
    <Routes>
      {/* Redirect root "/" */}
      <Route
        path="/"
        element={
          <Navigate
            to={
              isAuthenticated
                ? `${LAYOUT_DASHBOARD}/${urls.Home}`
                : publicRedirectPath
            }
            replace
          />
        }
      />

      {/* Dashboard (protected) */}
      <Route
        path={LAYOUT_DASHBOARD}
        element={<Dashboard navLinks={navLinks} />}
      >
        {dashboardLinks.map((r) => {
          const Component = r.view;
          return (
            <Route
              key={r.path}
              path={r.path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Route>

      {/* Auth */}

      <Route
        path={LAYOUT_AUTH}
        element={
          <Suspense fallback={<Loader />}>
            <AuthPage />
          </Suspense>
        }
      />
      {/* Catch-all */}
      <Route path="*" element={<H1>Page not Found</H1>} />
    </Routes>
  );
}
