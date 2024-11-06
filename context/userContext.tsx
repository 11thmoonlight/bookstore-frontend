"use client";

import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  blocked: boolean;
  cart: unknown[];
  confirmed: boolean;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  locale: null;
  localizations: unknown[];
  orders: unknown[];
  provider: string;
  publishedAt: string;
  updatedAt: string;
  username: string;
  wishlists: unknown[];
}

// interface User {
//   documentId: number;
//   username: string;
//   email: string;
//   blocked: boolean;
// }

interface UserResponse {
  ok: boolean;
  data: User | null;
  error: string | null;
}

interface UserContextType {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserMeLoader();

        if (response.ok && response.data) {
          setUser(response.data);
        } else {
          console.error("Error fetching user data:", response.error);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
