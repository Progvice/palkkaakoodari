import { Transaction } from "../../../src/entity/Transaction"

export const transaction1: Partial<Transaction> = {
  price: 100,
  amount: 120,
  datetime: new Date(),
}

export const transaction2: Partial<Transaction> = {
  price: 95,
  amount: 50,
  datetime: new Date(),
}
