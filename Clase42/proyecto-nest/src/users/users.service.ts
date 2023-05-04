import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: Array<User>;
  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    let newId;
    if (this.users.length > 0) {
      newId = this.users[this.users.length - 1].id + 1;
    } else {
      newId = 1;
    }
    const newUser: User = {
      id: newId,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    this.users[userIndex] = updateUserDto;
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    const newUsers = this.users.filter((u) => u.id !== id);
    this.users = newUsers;
    return `Ususuario con el id ${id} eliminado`;
  }
}
