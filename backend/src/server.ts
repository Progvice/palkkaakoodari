import { Express } from "express";

export const setupHTTP = (app: Express) => {
  const defaultPort = 3000;
  const portToUse = process.env.PORT
    ? (isNaN(Number(process.env.PORT))
      ? defaultPort : Number(process.env.PORT))
    : defaultPort;
  app.listen(portToUse, () => {
    console.log(`Server is running on port ${portToUse}`);
  });
};
