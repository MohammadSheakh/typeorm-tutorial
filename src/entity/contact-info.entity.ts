import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class ContactInfo{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : true})
  phone: string;

  @Column()
  email: string;
  
  
  @Column()
  employeeId: number; 
  //🟢 eita korle valo hoito onek khetre .. contact table dekhei bole 
  // deowa jaito .. eta kon employee er .. 
   

  /*
  // 🟢 this is uni-directional relationship .. 
  @OneToOne(() => Employee) // type return korte hobe .. jeta same as Employee 
  @JoinColumn() // employee table er id ei table e employee id nam e chole ashbe 
  /**
   * //one to one er khetre dui table er .. je kono ek table e Join column 
   * //add korte hobe .. 
   //
  employee: Employee;
  */

  // 🟢 this is bi-directional relation ship 
  @OneToOne(() => Employee, employee => employee.contactInfo, {onDelete: 'CASCADE'}) // if this employee get deleted .. contact info record o delete hoye jabe 
  /**
   * we are gonna specify, basically on the other side of the entity.. the employee entity
   * what is the property that relates to / that maps to this .. 
   * 
   */
  @JoinColumn() // employee table er id ei table e employee id nam e chole ashbe 
  employee: Employee;
}
/**
 * lets implement one to one relationship
 * between contact-info and employee
 */