import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "./contact-info.entity";
import { Task } from "./task.entity";

@Entity()
export class Employee{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 🟢 bi-directional is more flexible 
  @OneToOne(()=> ContactInfo, contactInfo => contactInfo.employee ) // contactInfo table e employee column na thakle error dibe ..
  /**
   * in that entity, what property does it map to .. 
   * oi side e @JoinColumn() likhsi .. so, ei side e 
   * lekha lagbe na ..  
   */
  @Column()
  contactInfo: ContactInfo;

  @OneToMany(() => Task, task => task.employee) // Task table e employee column na thakle error dibe 
  /**
   * whats the type, what does it map to on the other table or the entity
   */
  tasks : Task[];

  /**
   * its good time to know self referencing relations ..
   * as Employees represent different type of people .. inlcuding manager
   * 
   */

  // typically one manager thake .. so , 
  @ManyToOne(() => Employee, employee=> employee.directReports) // many employees map to one manager .. 
  // type ta bollam , and she kon jinish tar access pabe .. shetao bollam 
  manager: Employee;
  directReports: Employee[]; // kono employee jodi manager hoy .. taile 
  // tar directReports thakte pare ..
}


/**
 * lets implement one to one relationship
 * between contact-info and employee
 */
/**
 * employee table er shathe Task table er relation 
 * an employee can have one to many task .. 
 */