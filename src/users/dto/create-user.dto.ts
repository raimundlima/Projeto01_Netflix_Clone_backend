/* eslint-disable prettier/prettier */

import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  name: string;
  
  @IsNotEmpty()
  @IsEmail({},{ message:'informe um email valido!' })
  @IsString()
  email: string;
  
  @Length(6, 20)
  @IsString({ message:'informe uma senha com no minimo 6 carecteres' })
  password: string;

  @Length(6, 20)
  @IsString({ message:'as senhas não são iguais.' })
  passwordConfirmation: string;
}