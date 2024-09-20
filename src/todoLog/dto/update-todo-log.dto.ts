import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';

export class UpdateTodoLogDto extends PartialType(CreateTodoDto) {}
