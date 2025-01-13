import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class BaseUserDto {
  @IsNotEmpty({ message: "Password must not be empty" })
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(32, { message: "Password must be at most 32 characters" })
  password: string;
}
