import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Post } from "@src/modules/posts/entities/post.entity";

import { PostsModule } from "./modules/posts/posts.module";
import { Tag } from "./modules/tags/entities/tag.entity";
import { TagsModule } from "./modules/tags/tags.module";
import { User } from "./modules/users/entities/user.entity";
import { UsersModule } from "./modules/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post, Tag],
      synchronize: true,
      ssl: true,
    }),
    PostsModule,
    UsersModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
