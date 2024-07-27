import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(task: Partial<Task>): Promise<Task> {
    try {
      console.log('Task before saving:', task);
      const newTask = this.taskRepository.create(task);
      return await this.taskRepository.save(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Error creating task');
    }
  }
  

  async getTask(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id } }) || null;
  }

  async updateTask(id: number, updateData: Partial<Task>): Promise<Task | null> {
    await this.taskRepository.update(id, updateData);
    return this.getTask(id);
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected > 0;
  }

 async getAllTasks(userId:number): Promise<Task[]> {
    return this.taskRepository.query('SELECT * FROM task WHERE user_id = ?', [userId]);
  }
}
