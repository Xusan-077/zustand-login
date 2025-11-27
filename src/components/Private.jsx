import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store";
import { useQuery } from "@tanstack/react-query";
import { DUMMY_API } from "../API";
import { useEffect } from "react";

export default function Private() {
  const { isAuth, setIsAuth, updateUser } = useAuthStore();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await DUMMY_API.get(`/auth/me`);

      return res.data;
    },
    enabled: isAuth,
  });

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    if (access_token && refresh_token) {
      setIsAuth();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      updateUser(userData);
    }
  }, [userData, updateUser]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
