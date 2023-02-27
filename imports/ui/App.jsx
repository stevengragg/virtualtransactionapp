import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import AuthProvider from "./auth/AuthProvider.jsx";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import { useAccount } from "./hooks/useAccounts.js";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import FullLoading from "./svg/FullLoading.jsx";

function App() {
  const account = useAccount();

  console.log(account);
  if (account?.isLoading) return <FullLoading />;
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Protected Routes */}

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
