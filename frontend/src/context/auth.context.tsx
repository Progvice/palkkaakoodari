import { createContext, useState, useContext, ReactElement, useEffect } from "react";
import { AuthAccount } from "../types";
import { fetchAccessToken } from "../api/auth";
import { useLocation } from "react-router-dom";
import parseJwt from "../utils/jwtParse";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
  account: AuthAccount | undefined | null;
  setAccount: (account: AuthAccount | undefined | null) => void;
  accountInitialized: boolean;
  setAccountInitialized: (val: boolean) => void;
  token: string | null | undefined;
  setToken: (token: string | null) => void;
  expirationTime: number | undefined,
  setExpirationTime: (time: number) => void
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider : React.FC<{children: ReactElement}> = ({ children }) => {
  const [accountInitialized, setAccountInitialized] = useState<boolean>(false);
  const [account, setAccount] = useState<AuthAccount|undefined|null>();
  const [token, setToken] = useState<string|null|undefined>();
  const [expirationTime, setExpirationTime] = useState<number|undefined>();

  const location = useLocation();

  const {data: tokenData, refetch: refetchAccessToken} = useQuery({
    queryFn: async () => await fetchAccessToken(),
    queryKey: ['accesstoken'],
    enabled: false
  });

  useEffect(() => {
    const lsToken = localStorage.getItem("token");
    const lsAccount = localStorage.getItem("account");

    if (!lsToken || !lsAccount) return;

    setToken(lsToken);
    setAccount(JSON.parse(lsAccount) as AuthAccount);

  }, []);

  useEffect(() => {

    if (!expirationTime) return;
    if (Math.floor(Date.now() / 1000) >= expirationTime) refetchAccessToken();

  }, [location, expirationTime, refetchAccessToken]);

  useEffect(() => {
    if (!token) return;
    if (!localStorage.getItem("token")) localStorage.setItem("token", token);
    const parsedToken = parseJwt(token);
    // Check that parsed token contains exp and check that it is number and not NaN
    if (parsedToken?.exp && (!isNaN(Number(parsedToken?.exp)))) setExpirationTime(Number(parsedToken.exp));
  }, [token]);

  useEffect(() => {
    if (!tokenData) return;
    if ('token' in tokenData) setToken(tokenData['token']);
  }, [tokenData]);

  return (
    <AuthContext.Provider value={{ account, setAccount, accountInitialized, setAccountInitialized, token, setToken, expirationTime, setExpirationTime}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
