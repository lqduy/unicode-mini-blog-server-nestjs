import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";

import { EmailUnique } from "@src/rules/email-unique.rule";

export class CreateUserDto {
  @IsNotEmpty({ message: "Email must not be empty" })
  @IsEmail({}, { message: "Email must be a valid email" })
  @Validate(EmailUnique, { message: "Email already exists" })
  email: string;

  @IsNotEmpty({ message: "Password must not be empty" })
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(32, { message: "Password must be at most 32 characters" })
  password: string;
}
