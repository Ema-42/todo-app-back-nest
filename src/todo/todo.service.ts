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

@Injectable()
export class TodoService {
  constructor(
    /* @InjectRepository(UserRepository)
    private readonly customUserRepository: UserRepository, // Usa el repositorio personalizado */
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createTodoDto: CreateTodoDto, user: UserActiveInterface) {
    const locateUser = await this.validateUser(user.email);
    /* const cat = this.catRepository.create(createCatDto); */
    return await this.todoRepository.save({
      ...createTodoDto,
      user: locateUser,
    });
  }

  private async validateUser(email: string) {
    const userEntity = await this.userRepository.findOneBy({ email: email });

    if (!userEntity) {
      throw new BadRequestException('User not found');
    }
    return userEntity;
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return await this.todoRepository.find();
    }
    const locateUser = await this.validateUser(user.email);
    return await this.todoRepository.find({
      where: { user: { id: locateUser.id } },
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
  private validateOwnership(todo: Todo, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && todo.user.email !== user.email) {
      throw new UnauthorizedException();
    }
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    user: UserActiveInterface,
  ) {
    /* return await this.catRepository.update(id, updateCatDto); */
    await this.findOne(id, user);
    return await this.todoRepository.update(id, {
      ...updateTodoDto,
    });
  }
  //HACER EL UPDATE

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);
    return await this.todoRepository.softDelete({ id });
  }
}
