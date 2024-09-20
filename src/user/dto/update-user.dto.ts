
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';

export class UpdateUserDto  {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: string;

  @IsOptional()
  @IsString()
  ocupation?: string;
}
