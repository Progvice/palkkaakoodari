import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
@Entity()
@Index(["name"], { unique: true })
export class Role {

  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: "varchar", length: 255 })
    name: string;

}
