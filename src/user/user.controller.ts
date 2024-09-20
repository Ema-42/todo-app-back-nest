import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';


@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@Auth(Role.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Crea un nuevo usuario" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Obtiene todos los usuarios existentes" })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Obtiene un usuario específico por su ID" })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Actualiza un usuario existente por su ID" })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto , @ActiveUser()
  user: UserActiveInterface,) {
    return this.userService.update(id, updateUserDto,user);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Elimina un usuario específico por su ID" })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
