/* eslint-disable prettier/prettier */

import { Body, Controller, Post, Param, Delete, UseGuards, Get } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { UserRole } from 'src/users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import {User} from '@prisma/client';
import AuthUser from 'src/auth/auth_user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('movies')
export class MoviesController {
  constructor(private service: MoviesService) {}

  @Post('create')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createMovie(@Body() data: CreateMovieDto): Promise<Movie> {
    return this.service.create(data);
  }

  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany(): Promise<Movie[]>{
    return this.service.findMany();

  }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findUnique (@Param('id') id: string): Promise<Movie>{
    return this.service.findUnique(id);
  }

  //admin pode deletar.
  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(),RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{message: string}>{
    return this.service.deleteOne(id);
  }

  @Get('like/:id')
  @UseGuards(AuthGuard())
  likeMovie(
    @AuthUser() user: User,
    @Param('id') movieId: string,

  ): Promise<User>{
    const userId = user.id;
    return this.service.likeMovie(userId, movieId);
  }

}
