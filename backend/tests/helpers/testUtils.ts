import { v4 as uuidv4 } from "uuid";
import { getRepositories } from "../../src/repositories";
import { Repositories } from "../../src/types";
import { Account } from "../../src/entity/Account";
import { Employee } from "../../src/entity/Employee";
import { Team } from "../../src/entity/Team";

/**
 * Adds data to database as new Entities
 * @param accountToInsert Main entity: Account
 * @param employeesToInsert Children entities: Employee
 * @param teamsToInsert Children entities: Team
 * @returns
 */
export const createTestAccountData = async (
  accountToInsert: Partial<Account>,
  employeesToInsert: Partial<Employee>[],
  teamsToInsert: Partial<Team>[]) => {
  const { account: accountRepo, employee: employeeRepo, team: teamRepo } = await getRepositories();

  // Account
  const accountToSave: Partial<Account> = accountRepo.create(accountToInsert);
  accountToSave.uuid = uuidv4();
  accountToSave.id = undefined; // Just for sure!
  const insertedAccount: Account = await accountRepo.save(accountToSave);

  // Employee
  const employeesToSave: Partial<Employee>[] = employeesToInsert.map((employee) => {
    employee.accountId = insertedAccount.id;
    employee.uuid = uuidv4();
    employee.id = undefined;
    return employeeRepo.create(employee);
  });
  const insertedEmployees = await employeeRepo.save(employeesToSave);

  // Team
  const teamsToSave: Partial<Team>[] = teamsToInsert.map((team) => {
    team.accountId = insertedAccount.id;
    team.id = undefined;
    return teamRepo.create(team);
  });
  const insertedTeams = await teamRepo.save(teamsToSave);
  //console.debug("Test data created");

  return { insertedAccount, insertedEmployees, insertedTeams };
};

/**
 * Empty tables for tests
 */
export const clearTestAcountData = async () => {
  const repositories: Repositories = await getRepositories();

  await repositories.transaction.clear();
  await repositories.agreement.clear();
  await repositories.priceSuggestion.clear();
  await repositories.team.clear();
  await repositories.employee.clear();
  await repositories.tag.clear();
  await repositories.account.clear();
  //await repositories.role.clear();
};

export const toBeOneOf = (received: any, expectedValues: any[]) => {
  const pass = expectedValues.includes(received);
  if (pass) {
    return {
      message: () => `expected ${received} not to be one of [${expectedValues.join(', ')}]`,
      pass: true,
    };
  } else {
    return {
      message: () => `expected ${received} to be one of [${expectedValues.join(', ')}]`,
      pass: false,
    };
  }
};


export const expectToBeOneOf = (received: any, expectedValues: any[]) => {

  const result = toBeOneOf(received, expectedValues);
  if (!result.pass) {
    throw new Error(result.message());
  }
};

