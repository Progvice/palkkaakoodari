import { Express } from "express";

// ROUTE IMPORTS START
// ADMIN routes
import { tagsRoute } from "./routes/admin/tags";
import { rolesRoute } from "./routes/admin/roles";
import { employeesRoute as adminEmployeesRoute } from "./routes/admin/employees";

// AUTH routes
import { accountsRoute } from "./routes/accounts";
import { agreementsRoute } from "./routes/agreements";
import { employeesRoute } from "./routes/employees";
import { loginRoute } from "./routes/login";
import { priceSuggestionsRoute } from "./routes/priceSuggestions";
import { registerRoute } from "./routes/register";
import { teamsRoute } from "./routes/teams";
import { transactionsRoute } from "./routes/transactions";

// PUBLIC routes
import { authMiddleWare } from "./middlewares/auth";
import { adminMiddleWare } from "./middlewares/admin";
import { accessTokenRoute } from "./routes/accesstoken";
import { logoutRoute } from "./routes/logout";


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
  app.use(adminRoute + "/employees", adminMiddlewares, adminEmployeesRoute);
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
