import { jest, describe, it, expect, afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals";
import { SpyInstance, spyOn } from 'jest-mock';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { createTags, deleteTags, modifyTags, getTags, getTagsById } from '../../src/controllers/tags';
import { closeAllConnection, getRepositories } from '../../src/repositories';
import { Account } from '../../src/entity/Account';
import { Tag } from '../../src/entity/Tag';
import { tag1, tag2, tag3, tag4 } from '../helpers/testData/tags';
import dotenv from "dotenv";
import { clearTestAcountData } from "../helpers/testUtils";

// Inject db logging setting through environmental variables
process.env.DB_LOGGING = "false";

// Use .env-file settings
dotenv.config();

describe('Tags Controller', () => {
  let accountRepo: Repository<Account>;
  let tagRepo: Repository<Tag>;
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
    const { account, tag } = await getRepositories();
    accountRepo = account, tagRepo = tag;
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

  it('should create a new tag and return values', async () => {

  });

  // TODO: do not delete others!
  it('should delete a tag and only the provided one', async () => {

  });

  it('should modify a tag and only the provided one', async () => {

  });

  it('should get all tags of an account', async () => {

  });

  it('should get a tag by id', async () => {

  });
});
