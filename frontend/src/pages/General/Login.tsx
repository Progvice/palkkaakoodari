import { useState, FormEvent, useEffect } from "react";
import Input from "../../components/general/Input";
import { login } from "../../api/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import { useLang } from "../../context/lang.context";
import Button from "../../components/general/Button";
import Link from "../../components/general/Link";
import { pages } from "../pages";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const auth = useAuth();
  const {t} = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning(t("emailorpasswordnotset"));
      return;
    }

    const loginDetails = await login({
      email: email,
      password: password
    });

    if (typeof loginDetails?.status === 'boolean' && !loginDetails?.status) {
      toast.warning(t("wrongCredentials"));
      return;
    }

    if (loginDetails?.account) auth?.setAccount(loginDetails?.account);
    if (loginDetails?.token) auth?.setToken(loginDetails?.token);

    toast.success(t("loginsuccess"));
    navigate("/profile");
  }

  useEffect(() => {
    if (location?.state?.requireLogin) toast.warning(t("authRequired"));
  }, [location, t])

  return (
    <>
      <div className="flex flex-col w-full max-w-sm mx-auto">
        <h1 className="h1 my-6 text-center">{t("login")}</h1>
        <form className="border p-4 border-theme-grey" onSubmit={onSubmit}>
          <Input onChange={setEmail} label={"email"} field={t("email")}/>
          <Input type={"password"} onChange={setPassword} label={"password"} field={t("password")}/>
          <Button className="w-full my-2" type="submit">{t("login")}</Button>
          <p className="text-center my-2">{t('forgotpassword')}<br/><Link className={"text-theme-blue"} to={pages.resetpassword}>{t('resetpassword')}</Link></p>
          <hr className="border-theme-grey w-full border-[1px]"/>
          <p className="text-center mt-2">{t("notRegisteredYet")}<br/><Link className="text-theme-blue" to={pages.registration}>{t("joinnow")}</Link></p>
        </form>
      </div>
    </>
  )
}

export default LoginPage;
