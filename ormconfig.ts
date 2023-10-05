import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


const config:any | MysqlConnectionOptions | PostgresConnectionOptions = {
  type: 'sqlite',
  database : 'db',
  entities : ['dist/src/**/*.entity.js'],
  synchronize : true, // production e true rakha jabe na  // 
  /**
   * production e amra migrations use kori 
   */
  migrations:[
    'dist/src/db/migrations/*.js' // migration ke kon folder e typeorm khuje pabe 
  ],
  cli : {
    // where to put the migrations 

    // at this point synchronize should be false at this moment 
    //migrationsDir : './src/db/migrations' // 🔴 it was give me error 
    
    // entities: ["dist/entities/**/*{.js,.ts}"],
    // migrations: ["dist/migrations/**/*{.js,.ts}"],
    // subscribers: ["dist/subscribers/**/*{.js,.ts}"],

    "entities": [
      "src/entity/**/*{.js,.ts}"
   ],
   "migrations": [
      "src/migration/**/*{.js,.ts}"
   ],
   "subscribers": [
      "src/subscriber/**/*{.js,.ts}"
   ],
  }
}

export default config;