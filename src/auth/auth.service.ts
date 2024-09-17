import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register({
    firstName,
    lastName,
    email,
    password,
    ocupation,
  }: RegisterDto) {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      throw new BadRequestException('Existe un usuario con este email');
    }
    await this.userService.create({
      firstName,
      lastName,
      email,
      ocupation,
      password: await bcryptjs.hash(password, 10),
    });

    return { firstName, email };
  }
  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('email is wrong !');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token, email };
  }
  async profile({ email, role }: { email: string; role: string }) {
    /*     if(role !== 'admin'){
      throw new UnauthorizedException('No access')
    } */
    return await this.userService.findUserByEmail(email);
  }
}
