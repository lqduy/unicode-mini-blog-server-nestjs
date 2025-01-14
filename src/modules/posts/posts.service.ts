import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@src/modules/users/entities/user.entity";
import { APIError } from "@src/utils/api-error";

import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const currentUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!currentUser) {
      throw new APIError("User not found");
    }
    const newPost = this.postsRepository.create({
      ...createPostDto,
      user: currentUser,
    });
    const createdPost = await this.postsRepository.save(newPost);
    const { id, title, body, is_published, created_at, user } = createdPost;
    return {
      id,
      title,
      body,
      is_published,
      created_at,
      user: { id: user.id, email: user.email, role: user.role_id },
    };
  }

  findAll() {
    return this.postsRepository.find({
      order: { created_at: "DESC" },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
