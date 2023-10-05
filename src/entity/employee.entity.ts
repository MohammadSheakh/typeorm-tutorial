import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {ContactInfo}  from "./contact-info.entity";
import { Task } from "./task.entity";
import { Meeting } from "./meeting.entity";

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

  @OneToMany(() => Task, task => task.employee, {eager: true}) // Task table e employee column na thakle error dibe 
  /**
   * whats the type, what does it map to on the other table or the entity
    🟢{eager: true}  mane hocche .. joto bar ekta employee er data dekhte chabo 
    amake bole deowa lagbe na .. tar task gulao dekhte chai .. 
    automatic employee er data er shathe task er data o dekhabe .. 
  */
  tasks : Task[];

  /**
   * its good time to know self referencing relations ..
   * as Employees represent different type of people .. inlcuding manager
   * 
   */

  // typically one manager thake .. so , 
  @ManyToOne(() => Employee, employee=> employee.directReports, {onDelete: 'SET NULL'}) // many employees map to one manager .. 
  // type ta bollam , and she kon jinish tar access pabe .. shetao bollam 
  // manager leave nile jeno tar directReports gula delete hoye na jay .. 
  // amra shegula onno kono manager ke assign kore dibo 
  manager: Employee;

  /**
   * ek jon manager er onek gula report thakte pare .. 
   */
  @OneToMany(() => Employee, employee=> employee.manager)
  directReports: Employee[]; // kono employee jodi manager hoy .. taile 
  // tar directReports thakte pare ..

  /**
   * ekjon employee onek gula meeting e join korte pare 
   *
   */
  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  /**
   * join table is required for @manytomany() relations .. you must 
   * put @jointable() on one side of reation .. 
   */
  meetings : Meeting[];
}


/**
 * lets implement one to one relationship
 * between contact-info and employee
 */
/**
 * employee table er shathe Task table er relation 
 * an employee can have one to many task .. 
 */