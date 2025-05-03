import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class PriceSuggestion {

  @PrimaryGeneratedColumn()
    id?: number;

  @Column({ type: "integer" })
    buyerAccountId: number;

  @Column({ type: "integer" })
    sellerAccountId: number;

  @Column({ type: "integer" })
    teamId?: number;

  @Column({ type: "integer" })
    employeeId?: number;

  @Column({ type: "varchar", length: 255 })
    comment?: string;

  @Column({ type: "varchar", length: 255 })
    status: string;

  @Column({ type: "integer" })
    price: number;

  @Column({ type: "integer" })
    amount: number;

}
