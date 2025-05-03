export type Account = {
  uuid: string;
  id: number,
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  businessId: string;
  businessName: string;
  businessRole: string;
  bankAccountNumber: string;
  bankName: string;
  roleId: number | string;
};

export type Role = {
  id: number;
  name: string;
};

export type AuthAccount = {
  uuid?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export interface AuthObject {
  status: boolean;
  msg: string;
  token?: string;
};

export type Employee = {

  id: number;
  uuid: string;
  accountId: number;
  firstName: string;
  lastName: string;
  priceNegotiable?: boolean;
  hourlyRate: number;
  description?: string;
  skillLevel?: string;
  tags?: Tag[]
};

export type Team = {

  id: number;
  name?: string;
  priceNegotiable?: boolean;
  hourlyRate?: number;
  description?: string;
  accountId?: number;
  employees?: Employee[]
};

export type Role = {

  id: number;
  name: string;
};

export type Tag = {

  id?: number;
  name: string;
  type: string;
};
