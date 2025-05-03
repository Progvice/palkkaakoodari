import { AxiosError } from "axios";
import { Account, AuthAccount, AuthObject } from "../types";
import api from "./api";

import {publicPaths as paths, authPaths} from "./routes";

type LoginReturn = {account: AuthAccount, token: string, status?: boolean, msg?: string};

export const login = async (credentials: { email: string; password: string }) : Promise<LoginReturn|undefined> => {
  const res = await api.post<LoginReturn>(paths.login, credentials);
  return res?.data ? res.data : undefined;
};

export const register = async (account: Account) => {
  try {
    const response = await api.put("/public/register", account);
    if (response.data && response.data.token) localStorage.setItem("token", response.data.token);
    if (response.data && response.data.account) localStorage.setItem("account", response.data.account);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const ae = error as AxiosError;
      const responseObject: string | unknown = ae.response && ae.response.data;
      console.error("axioserror", responseObject, typeof responseObject);
      if (typeof (responseObject) === "string") {
        throw new Error(responseObject.toString());
      }
    }
    throw error;
  }
};

export const fetchAccessToken = async (): Promise<AuthObject | undefined> => {
  try {
    const res = await api.get(authPaths.accesstoken, { withCredentials: true });
    return res.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) return err.response?.data as AuthObject;
  }
};

export const logout = async () : Promise<{status: boolean, msg: string} | undefined> => {
  try {
    const res = await api.get<{status: boolean, msg: string}>(paths.logout, { withCredentials: true });
    return res?.data ? res.data : {status: false, msg: "failed"}
  } catch (err) {
    console.log(err);
  }
};
