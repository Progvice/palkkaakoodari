import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Agreement {

  @PrimaryGeneratedColumn()
    id?: number;

  @Column({ type: "integer" })
    priceSuggestionId: number;

  @Column({ type: "timestamp" })
    datetimeBuyerSign?: Date;

  @Column({ type: "timestamp" })
    datetimeSellerSign?: Date;
}
