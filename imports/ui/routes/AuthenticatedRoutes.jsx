import React from "react";
import { Route, Routes, BrowserRouter as UCCVTABrowserRouter } from "react-router-dom";
import RequireAuth from "../auth/RequireAuth";

import PrivateLayout from "../components/layout/PrivateLayout";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

function AuthenticatedRoutes() {
  return (
    <UCCVTABrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PrivateLayout />}>
          {/* Dashboard */}
          <Route
            path="/v/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UCCVTABrowserRouter>
  );
}

export default AuthenticatedRoutes;
