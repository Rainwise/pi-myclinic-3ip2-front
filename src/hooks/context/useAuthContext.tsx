"use client";
// Hook Imports
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useApiClient } from "@/hooks/api/useApiClient";
import { useRouter } from "next/navigation";

// Mantine Related Imports
import { notifications } from "@mantine/notifications";

// Type Imports
import { IAuthContext } from "@/types/auth/authContextType";
import { User } from "@/types/user/user";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingData, isCheckingData] = useState(true);
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("myClinicUser");
    if (stored) setUser(JSON.parse(stored));
    isCheckingData(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post<User>("Auth/login/", {
        username,
        password,
      });
      setUser(data);
      localStorage.setItem("myClinicUser", JSON.stringify(data));

      notifications.show({
        title: "Login successful",
        message: `Welcome back, ${data.username}!`,
        color: "green",
      });
    } catch (error: unknown) {
      notifications.show({
        title: "Login failed",
        message: error instanceof Error ? error.message : "An error occurred",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string ,email: string) => {
    setLoading(true);
    try {
      const { data } = await api.post<User>("auth/register/", {
        username,
        password,
        email
      });
      setUser(data);
      localStorage.setItem("myClinicUser", JSON.stringify(data));

      notifications.show({
        title: "Registration successful",
        message: `Your account has been created.`,
        color: "green",
      });
      router.push("/Auth");
    } catch (error: unknown) {
      notifications.show({
        title: "Registration failed",
        message: error instanceof Error ? error.message : "An error occurred",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("Auth/logout/");
    } catch (error: unknown) {
      notifications.show({
        title: "Logout failed",
        message: error instanceof Error ? error.message : "An error occurred",
        color: "red",
      });
    } finally {
      setUser(null);
      localStorage.removeItem("dreamUser");
      setLoading(false);
      notifications.show({
        title: "Logged out",
        message: "You have been signed out successfully.",
        color: "blue",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, checkingData, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
