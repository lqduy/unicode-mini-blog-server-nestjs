import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Tag } from "@src/modules/tags/entities/tag.entity";
import { TagsService } from "@src/modules/tags/tags.service";
import { User } from "@src/modules/users/entities/user.entity";
import { UsersService } from "@src/modules/users/users.service";

import { Post } from "./entities/post.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
  controllers: [PostsController],
  providers: [PostsService, UsersService, TagsService],
  imports: [
    TypeOrmModule.forFeature([Post, User, Tag]),
    JwtModule.register({}),
  ],
})
export class PostsModule {}
