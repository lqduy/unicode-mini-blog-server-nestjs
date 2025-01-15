import { Injectable } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { UsersService } from "@src/modules/users/users.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailExisting implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    const existingUserWithEmail = await this.usersService.findOneByEmail(email);
    return Boolean(existingUserWithEmail);
  }
}
