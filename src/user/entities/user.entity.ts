import { Role } from 'src/common/enums/rol.enum';
import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column()
  ocupation : string;
  @Column({ nullable: false, select: false })
  password: string;
  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: string;
  @DeleteDateColumn()
  deletedAt: Date;
  @CreateDateColumn()
  created_at: Date;
  //un usuario multiples todos (tareas)
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
