import { jest, describe, it, expect, afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals";
import { SpyInstance, spyOn } from 'jest-mock';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { createTeams, deleteTeams, modifyTeams, getTeams, getTeamsById } from '../../src/controllers/teams';
import { closeAllConnection, getRepositories } from '../../src/repositories';
import { Account } from '../../src/entity/Account';
import { Team } from '../../src/entity/Team';
import { team1, team2 } from '../helpers/testData/teams';
import dotenv from "dotenv";
import { clearTestAcountData, createTestAccountData } from "../helpers/testUtils";
import { buyerAndSellerAccount1, sellerAccount1 } from "../helpers/testData/accounts";

// Inject db logging setting through environmental variables
process.env.DB_LOGGING = "false";

// Use .env-file settings
dotenv.config();

describe('Teams Controller', () => {
  let accountRepo: Repository<Account>;
  let teamRepo: Repository<Team>;
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
    const { account, team } = await getRepositories();
    accountRepo = account, teamRepo = team;
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

  it('should create a new team and return values', async () => {
    const { insertedAccount: account } = await createTestAccountData(
      sellerAccount1,
      [],
      []
    );
    const newTeam: Partial<Team> = { ...team1 };
    newTeam.accountId = account.id; // Need to be set in UI / API request
    req.body = newTeam;

    await createTeams(req as Request, res as Response, next);

    const teamCreated = await teamRepo.findOne({ where: { name: newTeam.name } });
    expect(teamCreated).toBeDefined();
    expect(teamCreated?.description).toBe(newTeam.description);
  });

  // TODO: do not delete others!
  it('should delete a team and only the provided one', async () => {
    const { insertedAccount: account, insertedTeams: teams } =
      await createTestAccountData(
        sellerAccount1,
        [],
        [team1, team2]
      );
    const teamToDelete = teams[0];
    const teamNotToDelete = teams[1];
    teamToDelete.accountId = account.id; // Need to be set in UI / API request
    teamNotToDelete.accountId = account.id; // Need to be set in UI / API request
    const teamToDeleteTester = await teamRepo.findOne({ where: { name: teamToDelete.name } });
    const teamNotToDeleteTester = await teamRepo.findOne({ where: { name: teamNotToDelete.name } });
    expect(teamToDeleteTester).toBeDefined();
    expect(teamNotToDeleteTester).toBeDefined();

    req.body = { id: teamToDelete.id };
    await deleteTeams(req as Request, res as Response, next);

    const deletedTeam = await teamRepo.findOne({ where: { name: teamToDelete.name } });
    const stillExistsTeam = await teamRepo.findOne({ where: { name: teamNotToDelete.name } });
    expect(deletedTeam).toBeFalsy();
    expect(stillExistsTeam).toBeDefined();
  });

  it('should modify a team and only the provided one', async () => {
    const { insertedAccount: account, insertedTeams: teams } =
      await createTestAccountData(
        sellerAccount1,
        [],
        [team1, team2]
      );
    const teamToUpdate = teams[0];
    const teamNotToUpdate = teams[1];

    const earlierName = teams[0].name;
    const newName = earlierName + " the New";

    teamToUpdate.accountId = account.id; // Need to be set in UI / API request
    teamNotToUpdate.accountId = account.id;

    const teamToUpdateTester = await teamRepo.findOne({ where: { name: teamToUpdate.name } });
    const teamNotToUpdateTester = await teamRepo.findOne({ where: { name: teamNotToUpdate.name } });
    expect(teamToUpdateTester).toBeDefined();
    expect(teamNotToUpdateTester).toBeDefined();
    expect(teamToUpdate.id).not.toBeFalsy();
    expect(teamNotToUpdate.id).not.toBeFalsy();


    teamToUpdate.name = newName;
    req.body = teamToUpdate;
    console.log(req);
    await modifyTeams(req as Request, res as Response);

    const updatedTeam = await teamRepo.findOne({ where: { name: teamToUpdate.name } });
    const notUpdatedTeam = await teamRepo.findOne({ where: { name: teamNotToUpdate.name } });
    expect(updatedTeam).toBeDefined();
    expect(notUpdatedTeam).toBeDefined();
    expect(updatedTeam?.name).toBe(newName);
    expect(notUpdatedTeam?.name).not.toBe(newName);
  });

  it('should get all teams of an account', async () => {
    const { insertedAccount: account1, insertedTeams: teams1 } =
      await createTestAccountData(
        sellerAccount1,
        [],
        [team1]
      );
    const { insertedAccount: account2, insertedTeams: teams2 } =
      await createTestAccountData(
        buyerAndSellerAccount1,
        [],
        [team2]
      );
    expect(account1).toBeDefined();
    expect(account2).toBeDefined();
    expect(teams1.length).toBe(1);
    expect(teams2.length).toBe(1);

    req.body = { id: account1.id };

    const teamsToReturn = await getTeams(req as Request, res as Response);

    expect(teamsToReturn).toBeInstanceOf(Array);
    expect(teamsToReturn.length).toBe(teams1.length);
    expect(teamsToReturn[0].name).toBe(teams1[0].name);
  });

  it('should get a team by id', async () => {
    const { insertedAccount: account, insertedTeams: teams } =
      await createTestAccountData(
        buyerAndSellerAccount1,
        [],
        [team1]
      );
    expect(account).toBeDefined();

    req.body = { id: teams[0].id };
    const teamsToReturn: Partial<Team> = await getTeamsById(req as Request, res as Response);

    expect(teamsToReturn).toBeDefined();
  });
});
