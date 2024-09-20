import {
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
} from 'class-validator';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';
import { ActionType } from '../enums/todoActionType.dto';

export class CreateTodoLogDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  todo: Todo;

  @IsEnum(ActionType)
  actionType: ActionType;

  @IsOptional()
  @IsObject()
  previousData?: Record<string, any>;

  @IsOptional()
  @IsObject()
  newData?: Record<string, any>;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  comments?: string;
}
