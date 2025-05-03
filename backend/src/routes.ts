import { Express } from "express";

// ROUTE IMPORTS START
import { accountsRoute } from "./routes/accounts";
import { agreementsRoute } from "./routes/agreements";
import { employeesRoute } from "./routes/employees";
import { loginRoute } from "./routes/login";
import { priceSuggestionsRoute } from "./routes/priceSuggestions";
import { registerRoute } from "./routes/register";
import { tagsRoute } from "./routes/tags";
import { rolesRoute } from "./routes/roles";
import { teamsRoute } from "./routes/teams";
import { transactionsRoute } from "./routes/transactions";

import { authMiddleWare } from "./middlewares/auth";
import { adminMiddleWare } from "./middlewares/admin";
import { accessTokenRoute } from "./routes/accesstoken";
import { logoutRoute } from "./routes/logout";


const publicRoute = "/api/public";
const authRoute = "/api/auth";
const adminRoute = "/api/admin";

export const LoadRoutes = async (app: Express) => {

  // ROUTES START

  app.use(adminRoute + "/accounts", authMiddleWare, accountsRoute);
  app.use(authRoute + "/agreements", authMiddleWare, agreementsRoute);
  app.use(authRoute + "/employees", authMiddleWare, employeesRoute);
  app.use(authRoute + "/pricesuggestions", authMiddleWare, priceSuggestionsRoute);
  app.use(authRoute + "/roles", adminMiddleWare, rolesRoute);
  app.use(authRoute + "/tags", adminMiddleWare, tagsRoute);
  app.use(authRoute + "/teams", authMiddleWare, teamsRoute);
  app.use(authRoute + "/transactions", authMiddleWare, transactionsRoute);

  app.use(authRoute + "/accesstoken", authMiddleWare, accessTokenRoute);

  app.use(publicRoute + "/login", loginRoute);
  app.use(publicRoute + "/logout", logoutRoute);
  app.use(publicRoute + "/register", registerRoute);

  // ROUTES STOP
};
