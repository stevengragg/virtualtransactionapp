import React from "react";
import { useAccount } from "./hooks/useAccounts.js";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes.jsx";

function App() {
  const user = useAccount();

  return user?.isLoggedIn ? <h1>I am authenticated</h1> : <UnAuthenticatedRoutes />;
}

export default App;
