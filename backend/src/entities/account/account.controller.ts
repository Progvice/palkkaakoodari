
import { Request, Response, NextFunction } from "express";
import { Account } from "./account.entity";
import { getRepositories } from "../../repositories";
import { AuthenticatedRequest } from "../../types";

export const createAccounts = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Account> = req.body;
  const { account: accountRepo } = await getRepositories();
  const entityData: Partial<Account> = accountRepo.create(formData);
  const result = await accountRepo.createQueryBuilder()
    .insert()
    .into(Account)
    .values(entityData)
    .returning("*")
    .execute();
  res
    .status(201) // Created
    .json(result.generatedMaps[0])
    ;
};

export const deleteAccounts = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Account> = req.body;
  const { account } = await getRepositories();
  const accountId = req.params.id;
  await account.createQueryBuilder()
    .delete()
    .from(Account)
    .where("id = :accountId", { accountId: accountId })
    .execute();
  res
    .status(200)
    .json({ message: "DELETED" })
    ;
};

export const modifyAccounts = async (req: Request, res: Response) => {
  const formData: Partial<Account> = req.body;
  const { account } = await getRepositories();
  const paramAccountId = req.params.id;
  await account.createQueryBuilder()
    .update(Account)
    .set(formData)
    .where("uuid = :paramAccountId", { paramAccountId: paramAccountId })
    .execute();
  res
    .status(200)
    .json({ message: "MODIFIED" })
    ;
};

export const getAccounts = async (req: Request, res: Response) => {
  const areq = req as AuthenticatedRequest;
  const accountId = areq.account.id;
  const { account } = await getRepositories();
  const accounts: Account[] =
    await account.createQueryBuilder("a")
      .getMany();
  res
    .status(200)
    .json(accounts);
};

export const getAccountsById = async (req: Request, res: Response) => {
  const areq = req as AuthenticatedRequest;
  const accountId = areq.account.id;
  const paramAccountId = req.params.id;
  const { account } = await getRepositories();
  const accountById: Account =
    await account.createQueryBuilder()
      .where("id = :paramAccountId", { paramAccountId: paramAccountId })
      .getOne();
  res
    .status(200)
    .json(accountById);
};
