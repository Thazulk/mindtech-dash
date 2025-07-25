import api from "../axios";

// User type definitions based on JSONPlaceholder API
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// API service functions
export const usersService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId: number): Promise<User> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
};
