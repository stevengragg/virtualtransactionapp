import React from "react";
import { useAuth } from "../hooks/useAuth";

function VerificationPage() {
  const auth = useAuth();
  if (!auth?.user?.emails[0].verified) window.location.replace("/verify-account");
  return <div>VerificationPage</div>;
}

export default VerificationPage;
