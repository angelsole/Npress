import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyconfigModule } from  'nestjs-easyconfig';
import { DatabaseModule } from './config/database.module';


@Module({
  imports: [
    EasyconfigModule.register({}),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
