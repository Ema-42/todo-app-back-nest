import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { IsNotEmpty, IsDateString, Length } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { stateTodo } from 'src/common/enums/stateTodo.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', default: stateTodo.ACTIVE, enum: stateTodo })
  state: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.todos, { eager: true })
  user: User; // Relación con la entidad User

  @DeleteDateColumn()
  deletedAt: Date;

}
