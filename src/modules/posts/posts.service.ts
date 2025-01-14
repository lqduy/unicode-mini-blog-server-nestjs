import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Tag } from "@src/modules/tags/entities/tag.entity";
import { User } from "@src/modules/users/entities/user.entity";
import { ResponseItems } from "@src/schemas/common";
import { APIError } from "@src/utils/api-error";
import { generateUUID, getPagination } from "@src/utils/common";

import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostsDto } from "./dto/get-posts.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const currentUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!currentUser) {
      throw new APIError("User not found");
    }

    const { selecting_tags = [], typing_tags = [] } = createPostDto;

    if (selecting_tags.length + typing_tags.length > 5) {
      throw new APIError("You can only select up to 5 tags");
    }

    const uniqueSelectingTags = [...new Set(selecting_tags)];
    const uniqueTypingTags = [...new Set(typing_tags)];

    const tags = [];

    // Select tags
    if (uniqueSelectingTags.length) {
      const existingTags = await this.tagsRepository.find({
        where: { id: In(uniqueSelectingTags) },
      });

      if (existingTags.length !== selecting_tags.length) {
        throw new APIError(
          "Some tags you selected are not available",
          HttpStatus.NOT_FOUND
        );
      }

      tags.push(...existingTags);
    }

    // Create tags
    if (uniqueTypingTags.length) {
      const existingTags = await this.tagsRepository.find({
        where: { name: In(uniqueTypingTags) },
      });

      const existingTagNames = existingTags.map((tag) => tag.name);

      const tagsToCreate = uniqueTypingTags.filter(
        (tag) =>
          !existingTagNames.includes(tag) && !tags.some((t) => t.name === tag)
      );

      if (tagsToCreate.length) {
        const newTags = tagsToCreate.map((tag) =>
          this.tagsRepository.create({ id: generateUUID(), name: tag })
        );
        await this.tagsRepository.save(newTags);
        tags.push(...newTags);
      }

      tags.push(
        ...existingTags.filter((tag) => tags.every((t) => t.id !== tag.id))
      );
    }

    const newPost = this.postsRepository.create({
      ...createPostDto,
      user: currentUser,
      tags,
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
      tags: tags?.length ? tags : undefined,
    };
  }

  async findAll(getPostsDto: GetPostsDto = {}): Promise<ResponseItems> {
    const { page = 1, per_page = 10 } = getPostsDto;

    const queryBuilder = this.postsRepository
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "users")
      .leftJoinAndSelect("posts.tags", "tags")
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
        tags: post.tags?.length ? post.tags : undefined,
      })),
      pagination: getPagination(page, per_page, total),
    };
  }

  async getDetails(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ["user", "tags"],
    });

    if (!post) {
      throw new APIError("Post not found", HttpStatus.NOT_FOUND);
    }

    const { id, title, body, is_published, created_at, user, tags } = post;
    return {
      id,
      title,
      body,
      is_published,
      created_at,
      user: { id: user.id, email: user.email, role: user.role_id },
      tags: tags?.length ? tags : undefined,
    };
  }

  findOne(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
