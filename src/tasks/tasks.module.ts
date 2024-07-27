import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';


@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Register Task entity
  providers: [TaskService], // Register TaskRepository
  controllers: [TaskController],
})
export class TaskModule {}
