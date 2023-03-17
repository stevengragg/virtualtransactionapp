import React, { useEffect } from "react";

import { AuthContext } from "./AuthContext";
import { useAccount } from "../hooks/useAccounts";
import PageSpinner from "../components/shared/PageSpinner";

// import { FullScreenLoading } from "../components/global/FullScreenLoading";

function AuthProvider({ children }) {
  const user = useAccount();
  console.log("Auth Provider 🔒 :: ", { user });

  if (user?.isLoading) return <PageSpinner />;
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
