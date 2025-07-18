import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Transaction {

  @PrimaryGeneratedColumn()
    id?: number;

  @Column({ type: "integer" })
    agreementId: number;

  @Column({ type: "integer" })
    price: number;

  @Column({ type: "integer" })
    amount: number;

  @Column({ type: "timestamp" })
    datetime: Date;
}
