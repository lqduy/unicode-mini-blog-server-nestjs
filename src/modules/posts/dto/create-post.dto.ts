import { PickType } from "@nestjs/mapped-types";
import { IsArray, IsBoolean, IsOptional, IsUUID } from "class-validator";

import { BasePostDto } from "./base-post.dto";

export class CreatePostDto extends PickType(BasePostDto, ["title", "body"]) {
  @IsBoolean()
  @IsOptional()
  is_published: boolean;

  @IsArray()
  @IsUUID("4", { each: true })
  @IsOptional()
  selecting_tags: string[] | null;

  @IsArray()
  @IsOptional()
  typing_tags: string[] | null;
}
