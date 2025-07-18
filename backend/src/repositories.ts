import { connectPostgres } from "./utils/db";
import { type DataSource } from "typeorm";
import type { Repositories } from "./types";

import { Account }
  from "./entities/account/account.entity";
import { Agreement }
  from "./entities/agreement/agreement.entity";
import { Employee }
  from "./entities/employee/employee.entity";
import { PriceSuggestion }
  from "./entities/pricesuggestion/pricesuggestion.entity";
import { Role }
  from "./entities/role/role.entity";
import { Team }
  from "./entities/team/team.entity";
import { Tag }
  from "./entities/tag/tag.entity";
import { Transaction }
  from "./entities/transaction/transaction.entity";

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
