import { Injectable } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { PostsService } from "@src/modules/posts/posts.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class PostExisting implements ValidatorConstraintInterface {
  constructor(private readonly postsService: PostsService) {}

  async validate(id: string): Promise<boolean> {
    const existingPostWithId = await this.postsService.findOne(+id);
    return Boolean(existingPostWithId);
  }
}
