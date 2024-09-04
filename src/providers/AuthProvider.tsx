"use client";
import { getUser, Login, Logout } from "@/actions/AuthAction";
import { User } from "@/types";
import { LoginForm } from "@/types/authSchema";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  currentUser?: User | null;
  handleLogin: (
    values: LoginForm,
  ) => Promise<{ user: User | null; error: string | null }>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;
export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>();

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { user, error } = await getUser();
      if (user) {
        setCurrentUser(user);
      }
      if (error) {
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  async function handleLogin(
    values: LoginForm,
  ): Promise<{ user: User | null; error: string | null }> {
    // make request
    const { user, error } = await Login(values);

    if (user) {
      setCurrentUser(user);
      return { user, error: null };
    }

    if (error) {
      setCurrentUser(null);
      return { user: null, error };
    }
    return { user: null, error: null };
  }

  async function handleLogout() {
    await Logout();
    setCurrentUser(null);
    window.location.reload();
  }

  //   TODO: shift this to a hook or show only where needed (protected routes)
  //   if (currentUser === undefined) {
  //     return <>Loading...</>;
  //   }

  return (
    <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
