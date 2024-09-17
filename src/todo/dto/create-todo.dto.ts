import { IsString, IsEnum, IsDateString, IsOptional, IsEmail } from 'class-validator';


export class CreateTodoDto {
  @IsString()
  title: string;

  @IsDateString()
  date: Date; // Se espera una fecha en formato ISO
}
