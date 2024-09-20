import { stateTodo } from '../enums/stateTodo.enum';

export type TodoLogData = {
  id: number;
  title: string;
  state: stateTodo;
  date: Date;
  deletedAt: Date;
} | null;
