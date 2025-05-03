import { Account } from "../../types";
import api, { parseAxiosError } from "../api";
import { authPaths as paths } from "../routes";

export const addAccount = async (account: Account) => {
  try {
    const response = await api.post(paths.accounts, account);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const modifyAccount = async (account: Partial<Account>) => {
  try {
    const response = await api.put(paths.accounts + "/" + account.uuid, account);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const deleteAccount = async (account: Account) => {
  try {
    const response = await api.delete(paths.accounts + "/" + account.uuid);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};


export const getAccounts = async () => {
  try {
    const response = await api.get(paths.accounts);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const getAccount = async (uuid: string) => {
  try {
    const response = await api.get(paths.accounts + "/" + uuid);
    return response.data as Partial<Account>;
  } catch (error) {
    parseAxiosError(error);
  }
};
