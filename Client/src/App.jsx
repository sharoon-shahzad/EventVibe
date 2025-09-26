import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { getAllowedRoutes } from "./utils/routes/routes";
import {
  LAYOUT_DASHBOARD,
  LAYOUT_AUTH,
  urls,
} from "./utils/routes/route-paths";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import { H1 } from "./components/Atoms/Shared/headings";
import Loader from "./components/Atoms/Loader/Loader";

export default function App() {
  const isAuthenticated = false; // Replace with real
  const routes = getAllowedRoutes("USER", isAuthenticated);
  const publicRedirectPath = LAYOUT_AUTH;
  const dashboardLinks = routes.filter((r) => r.layout === LAYOUT_DASHBOARD);
  const navLinks = routes.filter((r) => r.showInNavLinks);
  const authLink = routes.filter((r) => r.layout === publicRedirectPath);

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
        element={
          <ProtectedRoute
            Navigate={Navigate}
            publicRedirectPath={publicRedirectPath}
            isAuthenticated={isAuthenticated}
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

      {authLink?.map((route, index) => {
        const Component = route.view;
        return (
          <Route
            path={route.path}
            element={
              <Suspense fallback={<Loader />}>
                <Component />
              </Suspense>
            }
            key={index}
          />
        );
      })}

      {/* Catch-all */}
      <Route path="*" element={<H1>Page not Found</H1>} />
    </Routes>
  );
}
