import React from "react";
import { Route, Routes, BrowserRouter as UCCVTABrowserRouter } from "react-router-dom";

import RequireAuth from "../auth/RequireAuth";
import PreAuthLayout from "../components/layout/PreAuthLayout";
import NotFoundPage from "../pages/NotFoundPage";
import VerificationPage from "../pages/VerificationPage";
import VerifyAccountPage from "../pages/VerifyAccountPage";

function PreAuthenticatedRoutes() {
  return (
    <UCCVTABrowserRouter>
      <Routes>
        {/* Pre Authenticated Routes */}
        <Route element={<PreAuthLayout />}>
          {/* Verify Account */}
          <Route
            path="/verify-account"
            element={
              <RequireAuth>
                <VerifyAccountPage />
              </RequireAuth>
            }
          />

          {/* Verify Account */}
          <Route
            path="/verification"
            element={
              <RequireAuth>
                <VerificationPage />
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

export default PreAuthenticatedRoutes;
