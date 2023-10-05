import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { User } from './user.entity';
// import config  from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User])],
  // think it like User module .. // it takes array of entities .. 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
