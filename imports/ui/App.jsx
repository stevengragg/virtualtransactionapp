import React from "react";

import { useAccount } from "./hooks/useAccounts.js";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes.jsx";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes.jsx";
import PreAuthenticatedRoutes from "./routes/PreAuthenticatedRoutes.jsx";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLoggedIn, user } = useAccount();

  return isLoggedIn ? user?.emails[0].verified ? <AuthenticatedRoutes /> : <PreAuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}

export default App;
