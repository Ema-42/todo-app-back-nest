import { Module } from '@nestjs/common';
import { TodoLogService } from './todo-log.service';
import { TodoLogController } from './todo-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoLog } from './entities/todo-log.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoLog]),AuthModule],
  controllers: [TodoLogController],
  providers: [TodoLogService],
  exports:[TodoLogService]
})
export class TodoLogModule {}
