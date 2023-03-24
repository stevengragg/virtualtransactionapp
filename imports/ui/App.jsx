import React from "react";

import { useAccount } from "./hooks/useAccounts.js";

import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/useAuth.js";

// react lazy

const AuthenticatedApp = React.lazy(() => import("./routes/AuthenticatedRoutes.jsx"));
const UnauthenticatedApp = React.lazy(() => import("./routes/UnAuthenticatedRoutes.jsx"));
// const PreAuthenticatedApp = React.lazy(() => import("./routes/PreAuthenticatedRoutes.jsx"));

function App() {
  const { isLoggedIn, user, isLoading } = useAuth();
  console.log("App 🚀 ==== ", { isLoggedIn, user, isLoading });
  // return isLoggedIn ? user?.emails[0].verified ? <AuthenticatedApp /> : <PreAuthenticatedApp /> : <UnauthenticatedApp />;
  return isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
