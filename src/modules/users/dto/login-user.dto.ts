import { PickType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";

import { EmailExisting } from "@src/rules/email-existing.rule";

import { BaseUserDto } from "./base-user.dto";

export class LoginUserDto extends PickType(BaseUserDto, ["password"]) {
  @IsNotEmpty({ message: "Email must not be empty" })
  @IsEmail({}, { message: "Email must be a valid email" })
  @Validate(EmailExisting, { message: "Account does not exist" })
  email: string;
}
