import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule,UserService]
})
export class UserModule {}
