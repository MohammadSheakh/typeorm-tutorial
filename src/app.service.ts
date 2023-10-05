import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Employee } from './entity/employee.entity';
import { Meeting } from './entity/meeting.entity';
import { Task } from './entity/task.entity';
import { ContactInfo } from './entity/contact-info.entity';

@Injectable()
export class AppService {

  /**
   * 
   */
  constructor(
    // dependency injection type , a name for that repository, return type 
    @InjectRepository(User) private usersRepository:Repository <User>,
    @InjectRepository(Employee) private employeesRepository:Repository <Employee>,
    private contactInfoRepository : Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingsRepository:Repository <Meeting>,
    @InjectRepository(Task) private tasksRepository:Repository <Task>
    ) {}
  
  // create a function to seed our database // you never do this to real application 

  async seed(){
    // person 1 // create CEO 
    const ceo = this.employeesRepository.create({name:'Mr. CEO'});
    await this.employeesRepository.save(ceo);

    const ceoContactInfo = this.contactInfoRepository.create(
      {
        email : 'email@email.com',
        // employeeId : ceo.id,
      }
    );

    ceoContactInfo.employee = ceo;
    await this.contactInfoRepository.save(ceoContactInfo);

    // person 2 // new employee
    const manager = this.employeesRepository.create({
      name : 'Mohammad',
      manager : ceo,
    });

    // employee can have one to many task 
    const task1 =  this.tasksRepository.create({name : 'Hire people'});
    await this.tasksRepository.save(task1);

    const task2 =  this.tasksRepository.create({name : 'Give Presentation to CEO'});
    await this.tasksRepository.save(task2);

    // amra ei task gula manager ke assign korbo .. 
    // amra kintu ekhono manager create kori nai .. 

    manager.tasks = [task1, task2]; // manager ke task gula assign kore dilam

    // ekhon amra manager ke save korbo .. i mean create korbo 

    // meeting o thakte pare .. 
    // ceo ke ekta meeting e join korabo
    const meeting1 = this.meetingsRepository.create({zoomUrl : 'meeting.com'});
    meeting1.attendees = [ceo];
    await this.meetingsRepository.save(meeting1);

    // manager keo meeting e join korabo .. 
    // jehetu meeting and employee er moddhe bi-directional relation ase

    manager.meetings = [meeting1];
    // by the time you create the manager it also gonna create relationship
    // for you .. 



    await this.employeesRepository.save(manager);







  }


  // getEmployeeById(id :number){
  //   return this.employeesRepository.findOne(id, {
  //     relations : ['manager', 'directReports', 'tasks'] // jei jei fields gula dekhte chai .. relations ta na dile just employee table er id and name show korto.. baki relation gula show korto na 
  
  //   })

    //// 🔴🟢 custom query koreo ei jinish ta kora jay query builder er maddhome  
    //  return this.employeesRepository.createQueryBuilder('employee')
    //  .leftJoinAndSelect('employee.directReports', 'directReports')
    //  .leftJoinAndSelect('employee.meetings', 'meetings')
    //  .leftJoinAndSelect('employee.tasks', 'tasks')
    //  .where("employee.id = :employeeId", {employeeId: id})
    //  .getOne()
  // }

  deleteEmployee(id: number){
    return this.employeesRepository.delete(id)
  }


  // get all user
  getAll(): Promise <User[]>{
    return this.usersRepository.find({
      relations: ['pets']
    }); // Select * from user
    // after where : // Select * from user JOIN pets
  }

  // find specific  user
  async getOneById(id : any): Promise<User>{
    try{
      const user = await this.usersRepository.findOneOrFail(id); // findOne()
      // select * from user where user.id = id;
      return user;
    }catch(err){
      // handle error 
      throw err;
    }
  }

  createUser(name : string) : Promise<User>{
    const newUser = this.usersRepository.create({name}); // const newUser = new User(); newUesr.name = name;
    // insert method o ase .. sheta amra use korbo na .. eta actual object ta return kore na . 
    // just information return kore je .. ekta row insert kora hoise ..
    return this.usersRepository.save(newUser); // same jinish update er jonno o use kora jabe .. 
  }

  async updateUser(id:number, name:string):Promise<User>{
    // first e amader ke user ta khuje ber korte hobe .. 
    // jeta amra already getOneById function e korsi ..
    const user = await this.getOneById(id);
    // manupulation
    user.name = name
    return this.usersRepository.save(user); // Update
  }

  async deleteUser(id: number):Promise<User>{
    const user = await this.getOneById(id);
    return  this.usersRepository.remove(user); // etao korte pari ..
    // delete method o ase .. sheta amra use korbo na .. sheta just 
    // delete hoise ei information share kore .. object ta return kore na 
    //return user;
  }

  /**
   * 🟢 using the repository u can also create your own .. custom queris 
   */
  customQuery():any{
    return this.usersRepository.createQueryBuilder("user").select("name").where(""); 
    // .select.( leftjoin / where / orderBy / group BY )
    // documentation in typeorm query builder 🟢
  }

}
