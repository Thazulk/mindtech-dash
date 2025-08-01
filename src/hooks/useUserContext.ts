import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import type { UserContextType } from "../context/UserContext";

// Custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
