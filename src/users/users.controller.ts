/* eslint-disable prettier/prettier */

import {Controller,Body,Post,Get,Param,UseGuards, Delete,} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserRole } from './enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import {Role} from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create-login')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }

  @Post('create-admin')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(),RolesGuard)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany(){
    return this.service.findMany();

  }
// só admin pode deletar user!
  @Delete('delte/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(),RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{message:string}>{
    return this.service.deleteOne(id);
  }

}
