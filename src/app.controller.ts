import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async createUser(): Promise<User[]>{
    //return this.appService.createUser("marius");// 🔵

    // create korar pore amra immediately update o korte parbo 
 
    // for that user create kore .. sheta ke amader ke ekta variable e 
    // rakhte hobe 
    
    // const user = await this.appService.createUser('test'); // 🔵
    // return this.appService.updateUser(user.id, "Name Updated"); // 🔴 
    // update hocche na 

    // for delete 

    // return this.appService.deleteUser(1); // 🔴 
    return this.appService.getAll(); // 🔵
    

  }

  @Get('/seed')
  async seed() : Promise<any>{
    await this.appService.seed();
    return 'seed complete';
  }
  
  


}
