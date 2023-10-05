import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {

  /**
   * 
   */
  constructor(@InjectRepository(User) private usersRepository:Repository <User>) {

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
