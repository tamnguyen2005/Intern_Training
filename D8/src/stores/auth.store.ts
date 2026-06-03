import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
interface UserProfile {
  name: string;
  email: string;
  role: string;
}
interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user, token) =>
          set(
            { user: user, token: token, isAuthenticated: true },
            false,
            "auth/login",
          ),
        logout: () =>
          set(
            { user: null, token: null, isAuthenticated: false },
            false,
            "auth/logout",
          ),
      }),
      { name: "auth-storage" },
    ),
  ),
);
