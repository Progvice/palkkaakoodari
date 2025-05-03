import { jest, describe, it, expect, afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals";
import { SpyInstance, spyOn } from 'jest-mock';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { createTransactions, deleteTransactions, modifyTransactions, getTransactions, getTransactionsById } from '../../src/controllers/transactions';
import { closeAllConnection, getRepositories } from '../../src/repositories';
import { Account } from '../../src/entity/Account';
import { Transaction } from '../../src/entity/Transaction';
import { transaction1, transaction2 } from '../helpers/testData/transactions';
import dotenv from "dotenv";
import { clearTestAcountData } from "../helpers/testUtils";

// Inject db logging setting through environmental variables
process.env.DB_LOGGING = "false";

// Use .env-file settings
dotenv.config();

describe('Transactions Controller', () => {
  let accountRepo: Repository<Account>;
  let transactionRepo: Repository<Transaction>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  let consoleLogSpy: SpyInstance;
  let consoleDebugSpy: SpyInstance;

  beforeAll(async () => {
    // Disable logging (console.log). Still logging error!
    consoleLogSpy = spyOn(console, 'log').mockImplementation(() => { });
    consoleDebugSpy = spyOn(console, 'debug').mockImplementation(() => { });

    // Initialize repositories to use
    const { account, transaction } = await getRepositories();
    accountRepo = account, transactionRepo = transaction;
  });

  beforeEach(async () => {
    // Mock parameters
    req = { body: "" };
    res = {};
    next = jest.fn();
    // Empty database before each test
    await clearTestAcountData();
  });

  afterEach(async () => {
    // Empty database after esch test
    //await clearTestAcountData();
  });

  afterAll(async () => {
    // Close openned database connections
    await closeAllConnection();

    // Restore console.log() and concole.debug()
    consoleLogSpy.mockRestore();
    consoleDebugSpy.mockRestore();
  });

  it('should create a new transaction and return values', async () => {

  });

  // TODO: do not delete others!
  it('should delete a transaction and only the provided one', async () => {

  });

  it('should modify a transaction and only the provided one', async () => {

  });

  it('should get all transactions of an account', async () => {

  });

  it('should get a transaction by id', async () => {

  });
});
