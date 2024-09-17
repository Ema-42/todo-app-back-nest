import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { stateTodo } from 'src/common/enums/stateTodo.enum';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsEnum(stateTodo)
  state?: stateTodo;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;
}
