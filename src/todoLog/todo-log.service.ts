import { Injectable } from '@nestjs/common';
import { CreateTodoLogDto } from './dto/create-todo-log.dto';
import { UpdateTodoLogDto } from './dto/update-todo-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoLog } from './entities/todo-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoLogService {
  constructor(
    @InjectRepository(TodoLog)
    private readonly todoLogRepository: Repository<TodoLog>,
  ) {}

  async create(createTodoLogDto: CreateTodoLogDto) {
    return await this.todoLogRepository.save(createTodoLogDto);
  }

  async findAll() {
    return await this.todoLogRepository.find();
  }

  async findOne(id: number) {
    return  await this.todoLogRepository.findOneBy({ id });;
  }

  update(id: number, updateTodoLogDto: UpdateTodoLogDto) {
    return `This action updates a #${id} todo-log`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo-log`;
  }
}
