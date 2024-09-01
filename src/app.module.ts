import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yhoyo',
      password: 'Stelkers08&',
      database: 'nest_task_management',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
