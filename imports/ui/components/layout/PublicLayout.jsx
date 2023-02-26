import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/public/Footer";
import Header from "../shared/public/Header";

function PublicLayout() {
  return (
    <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
      PublicLayout
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicLayout;
