import React from "react";
import { Route, Routes, BrowserRouter as UCCVTABrowserRouter } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import PublicLayout from "../components/layout/PublicLayout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegistrationPage from "../pages/RegistrationPage";

function UnAuthenticatedRoutes() {
  return (
    <UCCVTABrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>
        {/* Protected Routes */}

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UCCVTABrowserRouter>
  );
}

export default UnAuthenticatedRoutes;
