import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TaskService } from './tasks.service';
import { Task } from 'src/entities/task.entity';


@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService', 'CreateTask')
  async createTask(taskData: { task: Partial<Task> }): Promise<any> {
    // Extract task object from taskData
    const { task } = taskData;
    
    const response = await this.taskService.createTask(task);
    return { task : response};
  }

  @GrpcMethod('TaskService', 'GetTask')
  async getTask(data: { id: number }) {
    const task = await this.taskService.getTask(data.id);
    if (!task) {
      return { task: null };
    }
    return { task };
  }

  @GrpcMethod('TaskService', 'UpdateTask')
  async updateTask(data: { task: Task }) {
    console.log(data,"datatatat");
    
    const updatedTask = await this.taskService.updateTask(data.task.id, data.task);
    if (!updatedTask) {
      return { task: null };
    }
    return { task: updatedTask };
  }

  @GrpcMethod('TaskService', 'DeleteTask')
  async deleteTask(data: { id: number }) {
    const success = await this.taskService.deleteTask(data.id);
    return { success };
  }

  @GrpcMethod('TaskService', 'GetAllTasks')
  async getAllTask(data: { userId: number }) {
    const task = await this.taskService.getAllTasks(data.userId);
    return { tasks:task };
  }
}
