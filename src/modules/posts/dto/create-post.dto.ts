import { PickType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";

import { BasePostDto } from "./base-post.dto";

export class CreatePostDto extends PickType(BasePostDto, ["title", "body"]) {
  @IsBoolean()
  @IsOptional()
  is_published: boolean;
}
