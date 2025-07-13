
import express from "express";
import {getAccessToken} from "../controllers/accesstoken";
const router = express.Router();

router.get("/", getAccessToken);

export {router as accessTokenRoute};
            