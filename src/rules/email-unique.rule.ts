import { Injectable } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { UsersService } from "@src/modules/users/users.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    const existingUserWithEmail = await this.userService.findOneByEmail(email);
    return !Boolean(existingUserWithEmail);
  }
}
