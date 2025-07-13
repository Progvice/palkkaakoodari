import { Role } from "../../types";
import api, { parseAxiosError } from "../api";
import { authPaths as paths } from "../routes";

export const addRole = async (role: Role) => {
  try {
    const response = await api.post(paths.roles, role);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const modifyRole = async (role: Role) => {
  try {
    const response = await api.put(paths.roles + "/" + role.id, role);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const deleteRole = async (role: Role) => {
  try {
    const response = await api.delete(paths.roles + "/" + role.id);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};


export const getRoles = async () => {
  try {
    const response = await api.get(paths.roles);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const getRole = async (id: number) => {
  try {
    const response = await api.get(paths.roles + "/" + id);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const buyer: Role = { id: 1, name: "BUYER" };
export const seller: Role = { id: 3, name: "SELLER" };
export const buyerAndSeller: Role = { id: 3, name: "BUYER+SELLER" };
export const admin: Role = { id: 4, name: "ADMIN" };
