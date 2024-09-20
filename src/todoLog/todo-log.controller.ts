import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoLogService } from './todo-log.service';
import { CreateTodoLogDto } from './dto/create-todo-log.dto';
import { UpdateTodoLogDto } from './dto/update-todo-log.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('todo-log')
export class TodoLogController {
  constructor(private readonly todoLogService: TodoLogService) {}

  @Post()
  create(@Body() createTodoLogDto: CreateTodoLogDto) {
    return this.todoLogService.create(createTodoLogDto);
  }
  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.todoLogService.findAll();
  }
  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoLogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoLogDto: UpdateTodoLogDto,
  ) {
    return this.todoLogService.update(+id, updateTodoLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoLogService.remove(+id);
  }
}
