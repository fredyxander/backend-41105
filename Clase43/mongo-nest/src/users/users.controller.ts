import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private config: ConfigService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.usersService.create(createUserDto);
      return { status: 'success', data: userCreated };
    } catch (error) {
      return { status: 'success', message: error.message };
    }
  }

  @Get()
  async findAll() {
    console.log(this.config.get('CLAVE_TOKEN'));
    try {
      const users = await this.usersService.findAll();
      return { status: 'success', data: users };
    } catch (error) {
      return { status: 'success', message: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    const adminEmail = this.config.get('ADMIN_EMAIL');
    return { status: 'success', message: adminEmail };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return { status: 'success', message: 'usuario eliminado' };
    } catch (error) {
      return { status: 'success', message: error.message };
    }
  }
}
