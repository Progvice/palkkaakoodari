import { Express } from "express";

// ROUTE IMPORTS START
// ADMIN routes
import { tagsRoute } from "./entities/tag/tag.routes";
import { rolesRoute } from "./entities/role/role.routes";
// import { employeesRoute as adminEmployeesRoute } from "./routes/admin/employees";

// AUTH routes
import { accountsRoute } from "./entities/account/account.routes";
import { agreementsRoute } from "./entities/agreement/agreement.routes";
import { employeesRoute } from "./entities/employee/employee.routes";
import { loginRoute } from "./auth/login/login.routes";
import { priceSuggestionsRoute } from "./entities/pricesuggestion/pricesuggestion.routes";
import { registerRoute } from "./auth/register/register.routes";
import { teamsRoute } from "./entities/team/team.routes";
import { transactionsRoute } from "./entities/transaction/transaction.routes";

// PUBLIC routes
import { authMiddleWare } from "./middlewares/auth";
import { adminMiddleWare } from "./middlewares/admin";
import { accessTokenRoute } from "./auth/accesstoken/accesstoken.routes";
import { logoutRoute } from "./auth/logout/logout.routes";


const publicRoute = "/api/public";
const authRoute = "/api/auth";
const adminRoute = "/api/admin";

export const LoadRoutes = async (app: Express) => {

  // ROUTES START

  const adminMiddlewares = [
    authMiddleWare,
    adminMiddleWare
  ];

  const authMiddlewares = [
    authMiddleWare
  ];

  // ADMIN routes
  // app.use(adminRoute + "/employees", adminMiddlewares, adminEmployeesRoute);
  app.use(adminRoute + "/roles", adminMiddlewares, rolesRoute);
  app.use(adminRoute + "/tags", adminMiddlewares, tagsRoute);

  // AUTH routes
  app.use(adminRoute + "/accounts", authMiddlewares, accountsRoute);
  app.use(authRoute + "/agreements", authMiddlewares, agreementsRoute);
  app.use(authRoute + "/employees", authMiddlewares, employeesRoute);
  app.use(authRoute + "/pricesuggestions", authMiddlewares, priceSuggestionsRoute);
  app.use(authRoute + "/teams", authMiddlewares, teamsRoute);
  app.use(authRoute + "/transactions", authMiddlewares, transactionsRoute);
  app.use(authRoute + "/accesstoken", authMiddlewares, accessTokenRoute);

  // PUBLIC routes
  app.use(publicRoute + "/login", loginRoute);
  app.use(publicRoute + "/logout", logoutRoute);
  app.use(publicRoute + "/register", registerRoute);

  // ROUTES STOP
};
