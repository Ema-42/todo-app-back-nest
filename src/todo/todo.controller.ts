import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @ApiBearerAuth()
  @Auth(Role.USER)
  @Post()
  @ApiOperation({ summary: 'Permite crear una nueva tarea' })
  create(
    @Body() createTodoDto: CreateTodoDto,
    @ActiveUser() user: UserActiveInterface,
    @Req() request: Request, //para log
  ) {
    return this.todoService.create(createTodoDto, user, request);
  }

  @Get()
  @ApiBearerAuth()
  @Auth(Role.USER)
  @ApiOperation({
    summary:
      'Obtiene todas las tareas existentes del usuario, si es admin, devuelve todas',
  })
  findAll(
    @ActiveUser()
    user: UserActiveInterface,
  ) {
    return this.todoService.findAll(user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtiene una tarea específica por su ID' })
  findOne(
    @Param('id') id: number,
    @ActiveUser()
    user: UserActiveInterface,
  ) {
    return this.todoService.findOne(id, user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualiza una tarea existente por su ID' })
  @Auth(Role.USER)
  update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @ActiveUser()
    user: UserActiveInterface,
    @Req() request: Request, //para log
  ) {
    return this.todoService.update(id, updateTodoDto, user, request);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Elimina una tarea específica por su ID' })
  @Auth(Role.USER)
  remove(
    @Param('id') id: number,
    @ActiveUser() user: UserActiveInterface,
    @Req() request: Request,
  ) {
    return this.todoService.remove(id, user, request);
  }
}
