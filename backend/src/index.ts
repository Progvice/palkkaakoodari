import "reflect-metadata";
import express from "express";
import { setupHTTP } from "./server";
import { LoadRoutes } from "./routes";
import dotenv from "dotenv";
import { initDatabase } from "./repositories";
import { log } from "console";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


const init = async () => {
  try {
    await LoadRoutes(app);
    await initDatabase();
  } catch (error) {
    log("Initialization Error", error);
  }
  
  setupHTTP(app);
};

init();
