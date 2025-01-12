import { Module } from "@nestjs/common";

import { PostsModule } from "./modules/posts/posts.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
