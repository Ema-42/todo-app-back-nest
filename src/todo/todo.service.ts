import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/common/enums/rol.enum';

import { TodoLogService } from 'src/todoLog/todo-log.service';
import { ActionType } from 'src/todoLog/enums/todoActionType.dto';
import { IpUtilService } from 'src/common/utils/ip-util.service';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { stateTodo } from 'src/common/enums/stateTodo.enum';
import { TodoLogData } from 'src/common/interfaces/todoLogData.interface';

@Injectable()
export class TodoService {
  constructor(
    /* @InjectRepository(UserRepository)
    private readonly customUserRepository: UserRepository, // Usa el repositorio personalizado */
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,

    private readonly todoLogService: TodoLogService,
    private readonly ipUtilService: IpUtilService,
    private readonly userService: UserService,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    user: UserActiveInterface,
    request: Request,
  ) {
    const userEntity = await this.userService.findUserByEmail(user.email);
    const todoEntity = await this.todoRepository.save({
      ...createTodoDto,
      user: userEntity,
    });

    await this.logTodoAction(
      null,
      todoEntity,
      userEntity,
      request,
      'creacion de tarea',
      ActionType.CREATE,
    );
    return todoEntity;
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return await this.todoRepository.find();
    }
    const userEntity = await this.userService.findUserByEmail(user.email);
    return await this.todoRepository.find({
      where: { user: { id: userEntity.id } },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('El id no existe');
    }
    this.validateOwnership(todo, user);
    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    user: UserActiveInterface,
    request: Request,
  ) {
    const userEntity = await this.userService.findUserByEmail(user.email);
    const todoEntity = await this.findOne(id, user);

    const todoUpdateEntity = await this.todoRepository.update(id, {
      ...updateTodoDto,
    });
    const newTodoEntity = await this.findOne(id, user);

    await this.logTodoAction(
      newTodoEntity,
      todoEntity,
      userEntity,
      request,
      'actualizacion de tarea',
      ActionType.UPDATE,
    );

    return todoUpdateEntity;
  }

  async remove(id: number, user: UserActiveInterface, request: Request) {
    const todoEntity = await this.findOne(id, user);
    const todoEliminated = this.todoRepository.softDelete({ id });
    const newTodoEntity = await this.findOne(id, user);
    const userEntity = await this.userService.findUserByEmail(user.email);
    await this.logTodoAction(
      newTodoEntity,
      todoEntity,
      userEntity,
      request,
      'eliminación de tarea',
      ActionType.UPDATE,
    );

    return todoEliminated;
  }

  //************************************************* */

  private async logTodoAction(
    newTodoEntity: Todo,
    todo: Todo,
    user: User,
    request: Request,
    comments: string,
    actionType: ActionType,
  ) {
    let previousData: TodoLogData;
    let newData: TodoLogData;

    if (actionType === ActionType.CREATE) {
      previousData = null;
      newData = null;
    } else {
      previousData = {
        date: todo.date,
        title: todo.title,
        state: todo.state,
        id: todo.id,
        deletedAt: todo.deletedAt,
      };
      newData = {
        date: newTodoEntity.date,
        title: newTodoEntity.title,
        state: newTodoEntity.state,
        id: newTodoEntity.id,
        deletedAt: newTodoEntity.deletedAt,
      };
    }
    await this.todoLogService.create({
      previousData,
      newData,
      user,
      todo,
      actionType,
      comments,
      ipAddress: await this.ipUtilService.getClientIp(request),
    });
  }

  private validateOwnership(todo: Todo, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && todo.user.email !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
