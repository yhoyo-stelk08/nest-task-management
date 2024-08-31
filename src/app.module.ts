import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
