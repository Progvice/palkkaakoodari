import type { Account } from "./account/account.entity";
import type { Agreement } from "./entities/agreement/agreement.entity";
import type { Employee } from "./entity/Employee";
import type { PriceSuggestion } from "./entities/pricesuggestion/pricesuggestion.entity";
import type { DataSource, Repository } from "typeorm";
import type { Role } from "./entities/role/role.entity";
import type { Tag } from "./entities/tag/tag.entity";
import type { Team } from "./team/team.entity";
import type { Transaction } from "./entities/transaction/transaction.entity";
import type * as core from "express-serve-static-core";
import { Request } from "express";

/**
 * Defines a type for all repositories in the application.
 * Helps maintain type safety and scalability.
 */
export type Repositories = {
  dataSource: DataSource,
  account: Repository<Account>;
  agreement: Repository<Agreement>;
  employee: Repository<Employee>;
  priceSuggestion: Repository<PriceSuggestion>;
  role: Repository<Role>;
  tag: Repository<Tag>;
  team: Repository<Team>;
  transaction: Repository<Transaction>;
};

/**
 * Utility type for adding HTTP header user to a Request
 * in a Middleware/RequestHandler.
 * TODO: revise if needed at all
 */
interface AuthenticatedRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  account?: Partial<Account>;
}
/**
 * Temporary type having userdata in the memory.
 * TODO: remove
 */
export type UserData = { hash: string };

export interface AuthObject {
  status: boolean,
  msg: string,
  token?: string
};

export type ServiceRespond = {
  status: boolean,
  msg?: string,
}
