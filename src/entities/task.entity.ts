import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum Status {
  Todo = 1,
  InProgress = 2,
  Done = 0,
  InPreview=3,
}

export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  userId: User;


  @Column({ type: 'enum', enum: Status, default: Status.Todo })
  status: Status;

  @Column({ type: 'enum', enum: Priority, default: Priority.Low })
  priority: Priority;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true })
  updatedDate: Date;
}