import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { type } from "os";

@Entity()
export class Pet{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /** 
   * a pet has owner 
   */
  @ManyToOne(type=> User, user => user.pets)
  /**
   * onek gula pet thakbe .. ekta user er .. 
   * User entity er moto hobe .. ebong user entity er moddhe 
   * khujtese .. pets nam er kono column ase kina .. 
   */
  owner: User

  /**
   * database e pet er value update korle .. User er value o update hoye jabe 
   */
}