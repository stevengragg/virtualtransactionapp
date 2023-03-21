import React from "react";

import { useAccount } from "./hooks/useAccounts.js";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes.jsx";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes.jsx";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useAccount();

  return user?.isLoggedIn ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}

export default App;
