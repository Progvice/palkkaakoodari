import { createContext, useState, useContext, ReactElement, useEffect } from "react";
import { AuthAccount } from "../types";
import { fetchAccessToken } from "../api/auth";
import { useLocation } from "react-router-dom";

interface AuthContextType {
  account: AuthAccount | undefined | null;
  setAccount: (account: AuthAccount | undefined | null) => void;
  accountInitialized: boolean;
  setAccountInitialized: (val: boolean) => void;
  token: string | null | undefined;
  setToken: (token: string | null) => void;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider : React.FC<{children: ReactElement}> = ({ children }) => {
  const [accountInitialized, setAccountInitialized] = useState<boolean>(false);
  const [account, setAccount] = useState<AuthAccount|undefined|null>();
  const [token, setToken] = useState<string|null|undefined>();

  const location = useLocation();

  useEffect(() => {
    setAccountInitialized((prev) => {
      if (prev) return true; // If already initialized, do nothing

      const lsAccount : string | null = localStorage.getItem("account");
      if (lsAccount === null) return true;

      const lsParsedAccount: AuthAccount = JSON.parse(lsAccount);
      setAccount(lsParsedAccount);

      return true;
    });

    fetchAccessToken().then((res) => {
      if (res === undefined) return;
      if (res?.token) {
        setToken(res.token);
        localStorage.setItem("token", res.token);
      }
      if (!res?.status) {
        setAccount(null);
        setAccountInitialized(false);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("account");
      }
    });
  }, []);

  useEffect(() => {

  }, [location])

  useEffect(() => {
    if (account) localStorage.setItem("account", JSON.stringify(account));
  }, [account])

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token])

  return (
    <AuthContext.Provider value={{ account, setAccount, accountInitialized, setAccountInitialized, token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
