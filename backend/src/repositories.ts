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

let repositories: Repositories | null = null;

const roles = {
  buyer: { id: 1, name: "BUYER" },
  seller: { id: 3, name: "SELLER" },
  buyerAndSeller: { id: 3, name: "BUYER+SELLER" },
  admin: { id: 4, name: "ADMIN" },
};

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

export const initDatabase = async () => {
  await getRepositories();
  const rolesToAdd: Role[] = [roles.buyer, roles.seller, roles.buyerAndSeller, roles.admin];
  // Fetch roles from db
  const rolesInDatabase = new Map<number, Role>();
  (await repositories.role.createQueryBuilder()
    .where("id BETWEEN 1 and 4")
    .getMany()).forEach(
      role => rolesInDatabase.set(role.id, role)
    );

  // Add missing ones to database
  await repositories.role.save(rolesToAdd.filter(role => !rolesInDatabase.has(role.id)));
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
