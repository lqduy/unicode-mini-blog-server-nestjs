import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PostsModule } from "./modules/posts/posts.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule.forRoot(), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
