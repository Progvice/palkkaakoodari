
import express from "express";
import {getAccessToken} from "./accesstoken.controller";
const router = express.Router();

router.get("/", getAccessToken);

export {router as accessTokenRoute};
