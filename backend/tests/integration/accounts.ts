import { jest, describe, it, expect, afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals";
import { SpyInstance, spyOn } from 'jest-mock';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { closeAllConnection, getRepositories } from '../../src/repositories';
import { sellerAccount1 } from '../helpers/testData/accounts';
import { Account } from '../../src/entity/Account';
import dotenv from "dotenv";
import { clearTestAcountData, createTestAccountData } from "../helpers/testUtils";

// Inject db logging setting through environmental variables
process.env.DB_LOGGING = "false";

// Use .env-file settings
dotenv.config();

describe('Accounts Controller', () => {
  let accountRepo: Repository<Account>;
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
    const { account } = await getRepositories();
    accountRepo = account
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

  it('should create a new account and return values', async () => {

  });

  // TODO: do not delete others!
  it('should delete a account and only the provided one', async () => {

  });

  it('should modify a account and only the provided one', async () => {

  });

  it('should get all accounts of an account', async () => {

  });

  it('should get a account by id', async () => {

  });
});
