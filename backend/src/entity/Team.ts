import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: "varchar", length: 255 })
    name: string;

  @Column({ type: "boolean" })
    priceNegotiable: boolean;

  @Column({ type: "integer" })
    hourlyRate: number;

  @Column({ type: "varchar", length: 4000 })
    description: string;

  @Column({ type: "integer" })
    accountId: number;

  @OneToOne(() => Account, (account) => account.teams)
    account: Account;

}
