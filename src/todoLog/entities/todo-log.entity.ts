import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Todo } from 'src/todo/entities/todo.entity';
import { ActionType } from '../enums/todoActionType.dto';

@Entity()
export class TodoLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true }) // Solo define la relación en la entidad TodoLog
  user: User;

  @ManyToOne(() => Todo, { eager: true }) // También puedes registrar la tarea afectada
  todo: Todo;

  @Column({ type: 'enum', enum: ActionType })
  actionType: string; // CREATE, UPDATE, DELETE, etc.

  @Column({ type: 'jsonb', nullable: true })
  previousData: Record<string, any>; // Los datos antes de la acción (si es relevante)

  @Column({ type: 'jsonb', nullable: true })
  newData: Record<string, any>; // Los datos después de la acción

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, default: 'ip not found :(' })
  ipAddress: string; // Dirección IP del usuario

  @Column({ type: 'text', nullable: true })
  comments: string; // Comentarios o detalles adicionales
}
