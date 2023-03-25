import React from "react";
import { Route, Routes, BrowserRouter as UCCVTABrowserRouter } from "react-router-dom";
import RequireAuth from "../auth/RequireAuth";

import PrivateLayout from "../components/layout/PrivateLayout";
import DashboardPage from "../pages/DashboardPage";
import ManageRequestPage from "../pages/ManageRequestPage";
import NotFoundPage from "../pages/NotFoundPage";
import NotificationsPage from "../pages/NotificationsPage";
import RequestsPage from "../pages/RequestsPage";
import SettingsPage from "../pages/SettingsPage";
import VerifyAccountPage from "../pages/VerifyLoginToken";

function AuthenticatedRoutes() {
  return (
    <UCCVTABrowserRouter>
      <Routes>
        {/* Private Authenticated Routes */}

        <Route element={<PrivateLayout />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          {/* Requests */}
          <Route
            path="/requests"
            element={
              <RequireAuth>
                <RequestsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/requests/:id"
            element={
              <RequireAuth>
                <ManageRequestPage />
              </RequireAuth>
            }
          />
          {/* Settings */}
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            }
          />
          {/* Notifications */}
          <Route
            path="/notifications"
            element={
              <RequireAuth>
                <NotificationsPage />
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
