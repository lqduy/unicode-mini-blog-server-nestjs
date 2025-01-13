import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { generateUUID } from "@src/utils/common";
import Hasher from "@src/utils/hasher";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: Hasher.hash(createUserDto.password),
      role_id: 1,
      avatar_url: null,
      verify_token: generateUUID(),
    });
    const createdUser = await this.usersRepository.save(newUser);
    const { id, email, role_id, created_at } = createdUser;
    return { id, email, role_id, created_at };
  }

  findAll() {
    return "This action returns all users";
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
