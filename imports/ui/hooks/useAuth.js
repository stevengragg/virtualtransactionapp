import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext.js";

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
