import { Navigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { pages } from "./pages";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import { useLang } from "../context/lang.context";
import { toast } from "react-toastify";

const LogoutPage = () => {

  const auth = useAuth();
  const {t} = useLang();

  const {data, isFetched} = useQuery({
    queryKey: ['logout'],
    queryFn: async () => await logout()
  });

  useEffect(() => {
    auth?.setAccount(null);
    auth?.setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("account");
  }, [auth]);

  useEffect(() => {
    if (!isFetched) return;
    if (data?.status) toast.success(t("logoutSuccess"));
    else toast.warning(t("logoutFailed"));
  }, [data, t, isFetched])

  if (isFetched && data) {
    return <Navigate to={pages.home} />
  }
}

export default LogoutPage;
