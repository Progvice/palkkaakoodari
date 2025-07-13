import type { Response } from "express";
import { DataSource } from "typeorm";
import type { DataSource as DS } from "typeorm";

export const connectPostgres = (): DS | boolean => {

  const username = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT;
  const dbName = process.env.POSTGRES_DB;

  const dbLogging: boolean = process.env.DB_LOGGING ? process.env.DB_LOGGING === "true" : true;

  const applicationMode = process.env.APPLICATION_MODE;

  if (!username || !password || !host || !port) {
    console.error("Postgres environment variables not set");
    return false;
  }

  if (isNaN(Number(port))) {
    console.error("Postgres port is not a number");
    return false;
  }

  return new DataSource({
    type: "postgres",
    host: host,
    port: Number(port),
    username: username,
    password: password,
    database: dbName,
    entities: [__dirname + "/../entity/*.ts"],
    logging: dbLogging,
    synchronize: applicationMode !== "development" ? false : true,
  });
};

