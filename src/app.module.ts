import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { User } from './entity/user.entity';
import { Employee } from './entity/employee.entity';
import { Meeting } from './entity/meeting.entity';
import { Task } from './entity/task.entity';
import { ContactInfo } from './entity/contact-info.entity';
import { UsersModule } from './users/users.module';
// import config  from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    TypeOrmModule.forFeature(
      [User, 
      Employee, 
      ContactInfo,
      Meeting, 
      Task
    ]), UsersModule
    /**
     * what that is gonna enable us to do, with in our services,
     * we are going to be able to add injection there of our individual
     * repositories , which allow us to query our individual tables .. 
     * 
     * so, the way you do that is usually in within the constructor there
     * 
     * so, lets go to service and than manupulate 
     * 
     */
  ],
  // think it like User module .. // it takes array of entities .. 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
