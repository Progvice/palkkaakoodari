import { connectPostgres } from "./utils/db";
import { type DataSource } from "typeorm";
import type { Repositories } from "./types";
import { Account } from "./entity/Account";
import { Agreement } from "./entity/Agreement";
import { Employee } from "./entity/Employee";
import { PriceSuggestion } from "./entity/PriceSuggestion";
import { Role } from "./entity/Role";
import { Team } from "./entity/Team";
import { Tag } from "./entity/Tag";
import { Transaction } from "./entity/Transaction";

const readOnlyFields: Record<string, string[]> = {
  employee: ['uuid', 'accountId', 'tags']
};

type UpdateableRepositoryTypes = {} | Partial<Employee>;
type UpdateableRepositories = 'employee' | 'team';

let repositories: Repositories | null = null;

export const getRepositories = async (): Promise<Repositories> => {
  if (repositories) {
    console.debug("Returning cached repositories");
    return repositories; // Cached repositories
  }

  console.debug("Initializing repositories for the first time...");

  const postgresConnection: DataSource | boolean = connectPostgres();

  if (typeof postgresConnection === "boolean") {
    throw new Error("Postgres connection failed. Unable to load repositories.");
  }

  await postgresConnection.initialize();

  repositories = {
    dataSource: postgresConnection,
    account: postgresConnection.getRepository(Account),
    agreement: postgresConnection.getRepository(Agreement),
    employee: postgresConnection.getRepository(Employee),
    priceSuggestion: postgresConnection.getRepository(PriceSuggestion),
    role: postgresConnection.getRepository(Role),
    tag: postgresConnection.getRepository(Tag),
    team: postgresConnection.getRepository(Team),
    transaction: postgresConnection.getRepository(Transaction),
  };

  return repositories;
};


export const getUpdateableFields = (
  repository: UpdateableRepositories,
  data: Record<string, any>
): UpdateableRepositoryTypes => {
  if (!(repository in readOnlyFields)) {
    console.error('getUpdateableFields repository was invalid');
    return {}
  };

  const readOnly = new Set(readOnlyFields[repository]);
  const updateable: Record<string, any> = {};

  for (const key in data) {
    if (readOnly.has(key)) continue;
    updateable[key] = data[key];
  }

  return updateable;
};

/**
 * Close all connection if initialized.
 * Used in tests.
 */
export const closeAllConnection = async () => {
  const repositories = await getRepositories();
  for (const key in repositories) {
    const c = repositories[key].manager && repositories[key].manager.connection;
    if (c && c.isInitialized) {
      await c.close();
    }
  }
};
