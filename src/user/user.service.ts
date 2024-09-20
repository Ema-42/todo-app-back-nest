import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class UserService {
  constructor(
    /* @InjectRepository(UserRepository)
    private readonly customUserRepository: UserRepository, // Usa el repositorio personalizado */
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('El id no existe');
    }
    return user;
  }
  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstName','lastName', 'email', 'password', 'role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto,  user: UserActiveInterface,) {
    await this.findOne(id);
    return await this.userRepository.update(id, {
      ...updateUserDto,
    });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}
