import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,

  login: (userData) => {
    set({
      user: userData,
      isAuth: true,
    });

    localStorage.setItem("access_token", userData.accessToken);
    localStorage.setItem("refresh_token", userData.refreshToken);
  },
  logout: () => {
    set({
      isAuth: false,
      user: null,
    });
    localStorage.clear();
  },
  updateUser: (user) => {
    set({
      user,
      isAuth: true,
    });
  },
  setIsAuth: () => {
    set({
      isAuth: true,
    });
  },
}));

export default useAuthStore;
