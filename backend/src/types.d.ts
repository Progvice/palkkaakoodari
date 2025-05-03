import type { Account } from "./entity/Account";
import type { Agreement } from "./entity/Agreement";
import type { Employee } from "./entity/Employee";
import type { PriceSuggestion } from "./entity/PriceSuggestion";
import type { Repository } from "typeorm";
import type { Role } from "./entity/Role";
import type { Tag } from "./entity/Tag";
import type { Team } from "./entity/Team";
import type { Transaction } from "./entity/Transaction";
import type * as core from "express-serve-static-core";
import { Request } from "express";

/**
 * Defines a type for all repositories in the application.
 * Helps maintain type safety and scalability.
 */
export type Repositories = {
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
