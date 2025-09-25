import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { allowedRoutes } from "./utils/routes/routes";
import {
  LAYOUT_DASHBOARD,
  LAYOUT_AUTH,
  urls,
} from "./utils/routes/route-paths";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import { H1 } from "./components/Atoms/Shared/headings";
import Loader from "./components/Atoms/Loader/Loader";

export default function App() {
  const routes = allowedRoutes();
  const publicRedirectPath = LAYOUT_AUTH;
  const dashboardLinks = routes.filter((r) => r.layout === LAYOUT_DASHBOARD);
  const navLinks = routes.filter((r) => r.showInNavLinks);
  const authLinks = routes.filter((r) => r.layout === publicRedirectPath);
  const isAuth = true; // Replace with real

  return (
    <Routes>
      {/* Redirect root "/" */}
      <Route
        path="/"
        element={
          <Navigate
            to={
              isAuth ? `${LAYOUT_DASHBOARD}/${urls.Home}` : publicRedirectPath
            }
            replace
          />
        }
      />

      {/* Dashboard (protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            Navigate={Navigate}
            publicRedirectPath={publicRedirectPath}
            isAuth={isAuth}
          >
            <Dashboard navLinks={navLinks} />
          </ProtectedRoute>
        }
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
      <Route path={LAYOUT_AUTH}>
        {authLinks.map((r) => {
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

      {/* Catch-all */}
      <Route path="*" element={<H1>Page not Found</H1>} />
    </Routes>
  );
}
