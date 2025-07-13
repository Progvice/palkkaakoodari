import { jest, describe, it, expect, afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals";
import { SpyInstance, spyOn } from 'jest-mock';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { createAgreements, deleteAgreements, modifyAgreements, getAgreements, getAgreementsById } from '../../src/controllers/agreements';
import { closeAllConnection, getRepositories } from '../../src/repositories';
import { agreement1, agreement2 } from '../helpers/testData/agreements';
import dotenv from "dotenv";
import { Account } from "../../src/entity/Account";
import { Agreement } from "../../src/entity/Agreement";
import { clearTestAcountData } from "../helpers/testUtils";

// Inject db logging setting through environmental variables
process.env.DB_LOGGING = "false";

// Use .env-file settings
dotenv.config();

describe('Agreements Controller', () => {
  let accountRepo: Repository<Account>;
  let agreementRepo: Repository<Agreement>;
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
    const { account, agreement } = await getRepositories();
    accountRepo = account, agreementRepo = agreement;
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

  it('should create a new agreement and return values', async () => {

  });

  // TODO: do not delete others!
  it('should delete a agreement and only the provided one', async () => {

  });

  it('should modify a agreement and only the provided one', async () => {

  });

  it('should get all agreements of an account', async () => {

  });

  it('should get a agreement by id', async () => {

  });
});
