import React, { createContext } from "react";
import type { ReactNode } from "react";
import { useUsersList } from "../hooks/useUsers";
import type { User } from "../api/users/services";

// Context interface
export interface UserContextType {
  // User data
  users: User[];

  // Query states
  isLoading: boolean;
  isError: boolean;
  error: Error | null;

  // Query status checks
  isSuccess: boolean;
  isFetching: boolean;

  // Actions
  refetch: () => void;
}

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Provider props interface
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Use the existing TanStack Query hook
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    refetch,
  } = useUsersList({
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  // Refetch wrapper to handle the return type
  const handleRefetch = () => {
    refetch();
  };

  // Context value
  const contextValue: UserContextType = {
    users,
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    refetch: handleRefetch,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
