import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class GetPostsDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsPositive()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsPositive()
  per_page?: number;
}
