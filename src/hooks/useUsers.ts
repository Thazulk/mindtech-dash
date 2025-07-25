import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { usersService, type User } from "../api/users/services";
import { usersQueryKeys } from "../api/users/queries";

// Hook to fetch all users
export const useUsersList = (
  options?: Omit<UseQueryOptions<User[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: usersQueryKeys.lists(),
    queryFn: usersService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Hook to fetch a specific user by ID
export const useUserById = (
  userId: number,
  options?: Omit<UseQueryOptions<User, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: usersQueryKeys.detail(userId),
    queryFn: () => usersService.getUserById(userId),
    enabled: !!userId, // Only run if userId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
