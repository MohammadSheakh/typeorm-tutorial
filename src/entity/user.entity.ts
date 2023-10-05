import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";
import { type } from "os";

@Entity()
export class User {
  // this class represents the shape of our User table in database ..ssss
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type=> Pet, pet => pet.owner)
  /**
   * ekta user er onek gula pet thakbe .. 
   */
  pets: Pet[]

  // @Column() // for simplicity 
  // details: string;
  
  // @Column()
  // detailsAgain: string;
}