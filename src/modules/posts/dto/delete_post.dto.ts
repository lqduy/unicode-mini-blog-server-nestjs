import { Transform } from "class-transformer";
import { IsInt, IsPositive, Validate } from "class-validator";

import { PostExisting } from "@src/rules/post-existing.rule";

export class DeletePostDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsPositive()
  @Validate(PostExisting, { message: "Post not found" })
  id: number;
}
