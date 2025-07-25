import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import { useUsersList, useUserById } from "../hooks/useUsers";
import type { User } from "../api/users/services";

// Context interface
export interface UserContextType {
  // Users List API
  users: User[];
  usersLoading: boolean;
  usersError: boolean;
  usersErrorMessage: Error | null;
  usersSuccess: boolean;
  usersFetching: boolean;
  refetchUsers: () => void;

  // User Details API
  userDetails: User | null;
  userDetailsLoading: boolean;
  userDetailsError: boolean;
  userDetailsErrorMessage: Error | null;
  userDetailsSuccess: boolean;
  userDetailsFetching: boolean;
  fetchUserDetails: (userId: number) => void;
  refetchUserDetails: () => void;
  clearUserDetails: () => void;
  currentUserId: number | null;

  // Local user management
  addUser: (user: Omit<User, "id">) => void;
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
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  // Users List API
  const {
    data: apiUsers = [],
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorMessage,
    isSuccess: usersSuccess,
    isFetching: usersFetching,
    refetch: refetchUsersList,
  } = useUsersList({
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  // Combine API users with local users
  const allUsers = [...apiUsers, ...localUsers];

  // User Details API
  const {
    data: userDetails = null,
    isLoading: userDetailsLoading,
    isError: userDetailsError,
    error: userDetailsErrorMessage,
    isSuccess: userDetailsSuccess,
    isFetching: userDetailsFetching,
    refetch: refetchUserDetailsQuery,
  } = useUserById(currentUserId || 0, {
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!currentUserId, // Only fetch when userId is set
  });

  // Action handlers
  const handleRefetchUsers = () => {
    refetchUsersList();
  };

  const handleFetchUserDetails = (userId: number) => {
    setCurrentUserId(userId);
  };

  const handleRefetchUserDetails = () => {
    if (currentUserId) {
      refetchUserDetailsQuery();
    }
  };

  const handleClearUserDetails = () => {
    setCurrentUserId(null);
  };

  const handleAddUser = (newUser: Omit<User, "id">) => {
    // Generate a new ID based on the highest existing ID
    const highestId = Math.max(...allUsers.map((user) => user.id), 0);
    const userWithId: User = {
      ...newUser,
      id: highestId + 1,
    };

    setLocalUsers((prev) => [...prev, userWithId]);
  };

  // Context value
  const contextValue: UserContextType = {
    // Users List
    users: allUsers,
    usersLoading,
    usersError,
    usersErrorMessage,
    usersSuccess,
    usersFetching,
    refetchUsers: handleRefetchUsers,

    // User Details
    userDetails,
    userDetailsLoading,
    userDetailsError,
    userDetailsErrorMessage,
    userDetailsSuccess,
    userDetailsFetching,
    fetchUserDetails: handleFetchUserDetails,
    refetchUserDetails: handleRefetchUserDetails,
    clearUserDetails: handleClearUserDetails,
    currentUserId,

    // Local user management
    addUser: handleAddUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
