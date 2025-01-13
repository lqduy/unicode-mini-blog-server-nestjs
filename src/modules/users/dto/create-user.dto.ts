import { PickType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";

import { EmailUnique } from "@src/rules/email-unique.rule";

import { BaseUserDto } from "./base-user.dto";

export class CreateUserDto extends PickType(BaseUserDto, ["password"]) {
  @IsNotEmpty({ message: "Email must not be empty" })
  @IsEmail({}, { message: "Email must be a valid email" })
  @Validate(EmailUnique, { message: "Email already exists" })
  email: string;
}
