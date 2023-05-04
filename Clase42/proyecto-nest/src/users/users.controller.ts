import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.first_name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException('campos incompletos', HttpStatus.BAD_REQUEST);
    }
    const userCreated = this.usersService.create(createUserDto);
    return { status: 'success', userCreated };
  }

  @Get()
  findAll(@Query('limit') limit) {
    console.log(limit);
    const users = this.usersService.findAll();
    return { status: 'success', users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(parseInt(id))) {
      throw new HttpException('parametro invalido', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = this.usersService.update(+id, updateUserDto);
    return { status: 'success', message: result };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.usersService.remove(+id);
    return { status: 'success', message: result };
  }
}
