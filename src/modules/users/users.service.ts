import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserJwtPayload } from "@src/schemas/common";
import { APIError } from "@src/utils/api-error";
import { generateUUID } from "@src/utils/common";
import Hasher from "@src/utils/hasher";

import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
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

  async login(loginUserDto: LoginUserDto) {
    const existingUser = await this.findOneByEmail(loginUserDto.email);
    const isPasswordMatching = Hasher.compare(
      loginUserDto.password,
      existingUser.password
    );
    if (!isPasswordMatching) {
      throw new APIError("Password is not matching", HttpStatus.UNAUTHORIZED);
    }

    const tokenPayload: UserJwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role_id,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async getCurrentUser(email: string) {
    const user = await this.usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "post")
      .where("user.email = :email", { email })
      .andWhere("post.is_published = :isPublished", { isPublished: true })
      .andWhere("post.is_destroyed = :isDestroyed", { isDestroyed: false })
      .getOne();
    const {
      id,
      role_id,
      avatar_url,
      created_at,
      updated_at,
      is_verified,
      posts,
    } = user;
    return {
      id,
      role_id,
      avatar_url,
      is_verified,
      created_at,
      updated_at,
      total_posts: posts?.length || 0,
    };
  }

  findAll() {
    return "This action returns all users";
  }

  async findOneById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
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
