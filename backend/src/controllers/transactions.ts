
import { Request, Response, NextFunction } from "express";
import { getRepositories } from "../repositories";
import { Transaction } from "../entity/Transaction";

export const createTransactions = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Transaction> = req.body;
  const { transaction: transactionRepo } = await getRepositories();
  const entityData: Partial<Transaction> = transactionRepo.create(formData);
  await transactionRepo.createQueryBuilder()
    .insert()
    .into(Transaction)
    .values(entityData)
    .execute();
};

export const deleteTransactions = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Transaction> = req.body;
  const { transaction } = await getRepositories();
  await transaction.createQueryBuilder()
    .delete()
    .from(Transaction)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const modifyTransactions = async (req: Request, res: Response) => {
  const formData: Partial<Transaction> = req.body;
  const { transaction } = await getRepositories();
  await transaction.createQueryBuilder()
    .update(Transaction)
    .set(formData)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const getTransactions = async (req: Request, res: Response) => {
  const clientData: Partial<Transaction> = req.body;
  const { transaction } = await getRepositories();
  const accountId = clientData.id;
  // Get transactions of an account
  const transactions: Transaction[] =
    await transaction.createQueryBuilder("s")
      .where("s.accountId = :accountId", { accountId: accountId })
      .getMany();
  return transactions;
};

export const getTransactionsById = async (req: Request, res: Response) => {
  const clientData: Partial<Transaction> = req.body;
  const { transaction } = await getRepositories();
  const transactionId: number = clientData.id;
  // Get transactions of an account
  const transactionById: Transaction =
    await transaction.createQueryBuilder()
      .where("id = :transactionId", { transactionId: transactionId })
      .getOne();
  return transactionById;
};
