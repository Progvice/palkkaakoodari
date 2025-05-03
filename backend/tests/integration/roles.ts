import { jest, describe, it, expect, afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals";
import { SpyInstance, spyOn } from 'jest-mock';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { createRoles, deleteRoles, modifyRoles, getRoles, getRolesById } from '../../src/controllers/roles';
import { closeAllConnection, getRepositories } from '../../src/repositories';
import { Account } from '../../src/entity/Account';
import { Role } from '../../src/entity/Role';
import { extraRole1 } from '../helpers/testData/accounts';
import dotenv from "dotenv";
import { clearTestAcountData } from "../helpers/testUtils";

// Inject db logging setting through environmental variables
process.env.DB_LOGGING = "false";

// Use .env-file settings
dotenv.config();

describe('Roles Controller', () => {
  let accountRepo: Repository<Account>;
  let roleRepo: Repository<Role>;
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
    const { account, role } = await getRepositories();
    accountRepo = account, roleRepo = role;
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

  it('should create a new role and return values', async () => {

  });

  // TODO: do not delete others!
  it('should delete a role and only the provided one', async () => {

  });

  it('should modify a role and only the provided one', async () => {

  });

  it('should get all roles of an account', async () => {

  });

  it('should get a role by id', async () => {

  });
});
