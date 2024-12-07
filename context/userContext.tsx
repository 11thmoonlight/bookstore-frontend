"use client";

import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Cart {
  createdAt: string;
  documentId: string;
  products: unknown[];
  id: number;
  locale: null;
  publishedAt: null;
  updatedAt: string;
}

interface WishList {
  createdAt: string;
  documentId: string;
  products: unknown[];
  id: number;
  locale: null;
  publishedAt: null;
  updatedAt: string;
}

interface User {
  blocked: boolean;
  cart: Cart;
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
  wishlists: WishList;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
