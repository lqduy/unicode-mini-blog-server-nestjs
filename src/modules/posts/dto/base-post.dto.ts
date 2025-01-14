import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class BasePostDto {
  @IsNotEmpty({ message: "Title must not be empty" })
  @IsString({ message: "Title must be a string" })
  @MinLength(5, { message: "Title must be at least 5 characters" })
  @MaxLength(255, { message: "Title must be at most 255 characters" })
  title: string;

  @IsNotEmpty({ message: "Body must not be empty" })
  @IsString({ message: "Body must be a string" })
  @MinLength(10, { message: "Body must be at least 10 characters" })
  @MaxLength(1000, { message: "Body must be at most 1000 characters" })
  body: string;
}
