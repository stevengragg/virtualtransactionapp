import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.jsx";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import { Hello } from "./Hello.jsx";
import { useAccount } from "./hooks/useAccounts.js";
import { Info } from "./Info.jsx";
import LandingPage from "./pages/LandingPage.jsx";
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
      </Routes>
    </AuthProvider>
  );
}

export default App;
