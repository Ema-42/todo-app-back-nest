import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Auth(Role.USER)
  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.todoService.create(createTodoDto, user);
  }

  @Get()
  @Auth(Role.USER)
  findAll(
    @ActiveUser()
    user: UserActiveInterface,
  ) {
    console.log(user);
    return this.todoService.findAll(user);
  }

  @Get(':id')
  @Auth(Role.USER)
  findOne(
    @Param('id') id: number,
    @ActiveUser()
    user: UserActiveInterface,
  ) {
    return this.todoService.findOne(id, user);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @ActiveUser()
    user: UserActiveInterface,
  ) {
    return this.todoService.update(id, updateTodoDto, user);
  }

  @Delete(':id')
  @Auth(Role.USER)
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.todoService.remove(id, user);
  }
}
