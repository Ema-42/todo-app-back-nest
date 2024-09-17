import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(5)
  password: string;
  @IsString()
  ocupation: string;
}
