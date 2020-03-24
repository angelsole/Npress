import { Module } from '@nestjs/common'
import { EnvModule } from './env.module'
import { EnvService } from './env.service'
import { TypeOrmModule } from '@nestjs/typeorm'

function DatabaseOrmModule() {
  const config = new EnvService().read()

  return TypeOrmModule.forRoot({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: config.DB_SINCRONIZE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
  })
}

@Module({
  imports: [
    EnvModule,
    DatabaseOrmModule()
  ]
})
export class DatabaseModule { }

// FONT: https://gist.github.com/joseluisq/b82716f76ab76eee071f53bdd8356530