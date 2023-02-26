import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useAccount } from "../hooks/useAccounts";

// import { FullScreenLoading } from "../components/global/FullScreenLoading";

function AuthProvider({ children }) {
  const location = useLocation();
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change
  const account = useAccount();
  return (
    <AuthContext.Provider value={account}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
