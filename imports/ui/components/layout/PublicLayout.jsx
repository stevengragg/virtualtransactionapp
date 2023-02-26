import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/public/Footer";
import Header from "../shared/public/Header";

function PublicLayout() {
  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicLayout;
