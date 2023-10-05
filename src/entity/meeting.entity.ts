import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";
import { type } from "os";
import { Employee } from "./employee.entity";

@Entity()
export class Meeting {
  // this class represents the shape of our User table in database ..ssss
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zoomUrl: string;

  @ManyToMany(() => Employee, employee=> employee.meetings)
  attendees : Employee[];
}