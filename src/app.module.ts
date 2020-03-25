import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';


@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ArticlesModule,
  ],
})
export class AppModule {}
