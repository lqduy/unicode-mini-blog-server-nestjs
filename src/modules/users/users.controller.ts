import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthGuard } from "@src/guards/auth/auth.guard";
import { UserJwtPayload } from "@src/schemas/common";
import { ResponseHandler } from "@src/utils/response-handler";

import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const data = await this.usersService.login(loginUserDto);
    return ResponseHandler.success({ data, message: "Login Successful" });
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@Req() req: Request & { user: UserJwtPayload }) {
    const { email } = req.user;
    return this.usersService.getCurrentUser(email);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
