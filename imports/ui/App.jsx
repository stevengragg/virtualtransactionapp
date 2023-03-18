import React from "react";

import { useAccount } from "./hooks/useAccounts.js";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes.jsx";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes.jsx";

function App() {
  const user = useAccount();

  return user?.isLoggedIn ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}

export default App;
