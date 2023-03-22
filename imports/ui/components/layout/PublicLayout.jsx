import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Footer from "../shared/public/Footer";
import Header from "../shared/public/Header";

function PublicLayout() {
  const auth = useAuth();
  if (auth?.isLoggedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicLayout;
