import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import CurrentUser from "@src/decorators/current-user.decorator";
import { AuthGuard } from "@src/guards/auth/auth.guard";

import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostsDto } from "./dto/get-posts.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser("id") userId: number
  ) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  findAll(@Query() getPostsDto: GetPostsDto) {
    return this.postsService.findAll(getPostsDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postsService.remove(+id);
  }
}
