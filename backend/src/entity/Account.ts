import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Generated,
  OneToMany,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Employee } from "./Employee";
import { Role } from "./Role";
import { Team } from "./Team";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  @Generated("uuid")
  uuid: string;

  @Column("varchar", { length: 255 })
  @Index({ unique: true })
  email: string;

  @Column("varchar", { length: 255 })
  password: string;

  @Column("varchar", { length: 255 })
  firstName: string;

  @Column("varchar", { length: 255 })
  lastName: string;

  @Column("varchar", { length: 255 })
  @Index({ unique: true })
  businessId: string;

  @Column("varchar", { length: 255 })
  @Index({ unique: true })
  businessName: string;

  @Column("varchar", { length: 255 })
  businessRole: string;

  @Column("varchar", { length: 255, nullable: true })
  bankAccountNumber?: string;

  @Column("varchar", { length: 255, nullable: true })
  bankName?: string;

  @Column("integer")
  roleId: number;

  @OneToMany(() => Employee, (employee) => employee.account)
  employees?: Employee[];

  @OneToMany(() => Team, (team) => team.account)
  teams?: Team[];

  @ManyToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  role: Role;
}
