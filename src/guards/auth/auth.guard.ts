import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

import { UsersService } from "@src/modules/users/users.service";
import { UserJwtPayload } from "@src/schemas/common";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException("Unauthorized");
    }

    try {
      const decodedUser: UserJwtPayload = await this.jwtService.verifyAsync(
        accessToken,
        { secret: process.env.ACCESS_TOKEN_SECRET_SIGNATURE }
      );

      if (!decodedUser) {
        throw new UnauthorizedException("Unauthorized");
      }

      const user = await this.usersService.findOneByEmail(decodedUser.email);
      if (!user) {
        throw new UnauthorizedException("Unauthorized");
      }

      request.user = {
        id: user.id,
        email: user.email,
        role: user.role_id,
      };

      return true;
    } catch (e) {
      throw new UnauthorizedException("Unauthorized: " + String(e));
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    return request.headers["authorization"] || null;
  }
}
