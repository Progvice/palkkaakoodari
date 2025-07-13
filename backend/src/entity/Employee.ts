import { Entity, PrimaryGeneratedColumn, Column, Index, Generated, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Account } from "./Account";
import { Tag } from "./Tag";
@Entity()
@Index(["uuid"], { unique: true })
export class Employee {

  @PrimaryGeneratedColumn()
    id: number;

  @Column("uuid")
  @Generated("uuid")
    uuid: string;

  @Column({ type: "integer" })
    accountId: number;

  @Column({ type: "varchar", length: 255 })
    firstName: string;

  @Column({ type: "varchar", length: 255 })
    lastName: string;

  @Column({ type: "boolean", default: false })
    priceNegotiable: boolean;

  @Column({ type: "integer" })
    hourlyRate: number;

  @Column({ type: "varchar", length: 4000 })
    description: string;

  @Column({ type: "varchar", length: 255 })
    skillLevel: string;

  @ManyToOne(() => Account, (account) => account.employees)
  account: Account;

  @ManyToMany(() => Tag, tag => tag.employees)
  @JoinTable() // This decorator only goes on ONE side — the owning side
  tags: Tag[];
}

export const employeeRequiredFields = [
  'firstName',
  'lastName',
  'hourlyRate'
];

export const employeeModifiable = ['firstName', 'lastName', 'priceNegotiable', 'hourlyRate', 'description', 'skillLevel'];

