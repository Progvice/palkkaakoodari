import { Account } from "../../../src/entity/Account"
import { Role } from "../../../src/entity/Role"

export const sellerAccount1: Partial<Account> = {
  email: 'test1@example.com',
  password: 'password',
  firstName: 'Test1',
  lastName: 'User',
  businessId: '123456',
  businessName: 'Test1 Business',
  businessRole: 'Owner',
  roleId: 2, // SELLER
}

export const buyerAndSellerAccount1: Partial<Account> = {
  email: 'test2@example.com',
  password: 'password',
  firstName: 'Test2',
  lastName: 'User',
  businessId: '654321',
  businessName: 'Test2 Business',
  businessRole: 'Owner',
  roleId: 3, // BUYER+SELLER
}

export const buyerAccount1: Partial<Account> = {
  email: 'test3@example.com',
  password: 'password',
  firstName: 'Test3',
  lastName: 'User',
  businessId: '111111',
  businessName: 'Test3 Business',
  businessRole: 'Owner',
  roleId: 1, // BUYER
}

export const adminAccount1: Partial<Account> = {
  email: 'test4@example.com',
  password: 'password',
  firstName: 'Test666',
  lastName: 'User',
  businessId: '666666',
  businessName: '666 Business',
  businessRole: 'Owner',
  roleId: 4,
}

export const extraRole1: Partial<Role> = {
  name: "God"
}
