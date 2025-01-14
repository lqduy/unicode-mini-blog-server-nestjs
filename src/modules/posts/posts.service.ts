import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@src/modules/users/entities/user.entity";
import { ResponseItems } from "@src/schemas/common";
import { APIError } from "@src/utils/api-error";
import { getPagination } from "@src/utils/common";

import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostsDto } from "./dto/get-posts.dto";
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

  async findAll(getPostsDto: GetPostsDto = {}): Promise<ResponseItems> {
    const { page = 1, per_page = 10 } = getPostsDto;

    const queryBuilder = this.postsRepository
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "users")
      .andWhere("posts.is_published = :is_published", { is_published: true })
      .orderBy("posts.created_at", "DESC")
      .skip((page - 1) * per_page)
      .take(per_page);

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      items: posts.map((post) => ({
        id: post.id,
        title: post.title,
        created_at: post.created_at,
        updated_at: post.updated_at,
        user: {
          id: post.user.id,
          email: post.user.email,
        },
      })),
      pagination: getPagination(page, per_page, total),
    };
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
