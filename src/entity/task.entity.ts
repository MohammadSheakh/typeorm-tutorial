import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Task{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : true})
  name: string;

  @ManyToOne(()=>Employee, employee => employee.tasks, {onDelete:'SET NULL'}) 
  /**
   * whats the type, what does it map to on the other table or the entity
   * // kono employee delete hoye gele .. task table er ei employee option e 
   * //null assign kore dibo .. jeno pore onno kono employee ke ei task assign kore deowa jete pare 
   */
  employee: Employee
}

/**
 * task table er shathe employee table er relation 
 * 
 * an employee can have one to many task .. 
 */