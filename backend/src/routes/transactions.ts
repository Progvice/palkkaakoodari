
import express from "express";
import {createTransactions, deleteTransactions, getTransactions, modifyTransactions, getTransactionsById} from "../controllers/transactions";
const router = express.Router();

router.post("/", createTransactions);
router.get("/", getTransactions);
router.get("/:id", getTransactionsById);
router.patch("/", modifyTransactions);
router.delete("/", deleteTransactions);

export {router as transactionsRoute};
            