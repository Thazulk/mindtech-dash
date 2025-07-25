import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { usersService } from "./services";
import type { User } from "./services";

// Query keys for consistent cache management
export const usersQueryKeys = {
  all: ["users"] as const,
  lists: () => [...usersQueryKeys.all, "list"] as const,
  details: () => [...usersQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...usersQueryKeys.details(), id] as const,
};

// Hook to fetch all users
export const useUsers = (
  options?: Omit<UseQueryOptions<User[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: usersQueryKeys.lists(),
    queryFn: usersService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
