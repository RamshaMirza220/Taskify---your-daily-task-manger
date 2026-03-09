import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

// Clean custom hook — import this instead of useContext(AuthContext) everywhere
export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}