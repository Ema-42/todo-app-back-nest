import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TodoLogModule } from 'src/todoLog/todo-log.module';
import { IpUtilService } from 'src/common/utils/ip-util.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]),UserModule,AuthModule,TodoLogModule],
  controllers: [TodoController],
  providers: [TodoService, IpUtilService],
})
export class TodoModule {}

