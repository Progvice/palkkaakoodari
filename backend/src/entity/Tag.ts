import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Employee } from "./Employee";
@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
    id?: number;

  @Column({ type: "varchar", length: 255 })
    name: string;

  @Column({ type: "varchar", length: 255 })
    type: string;

  @ManyToMany(() => Employee, employee => employee.tags)
  employees: Employee[];

}
