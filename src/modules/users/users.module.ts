import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmailExisting } from "@src/rules/email-existing.rule";
import { EmailUnique } from "@src/rules/email-unique.rule";

import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailUnique, EmailExisting],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
