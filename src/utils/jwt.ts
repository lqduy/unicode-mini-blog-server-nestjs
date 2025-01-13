import * as JWT from "jsonwebtoken";
import { type Algorithm, type JwtPayload } from "jsonwebtoken";

import type { UserJwtPayload } from "@src/schemas/common";

import { APIError } from "./api-error";

export class Jwt {
  private static algorithm: Algorithm = "HS256";

  static generateToken(
    userPayload: UserJwtPayload,
    secretSignature: string,
    expiresIn: string
  ): string {
    try {
      return JWT.sign(userPayload, secretSignature, {
        algorithm: this.algorithm,
        expiresIn,
      });
    } catch (error) {
      throw new APIError(`Failed to generate token: ${String(error)}`);
    }
  }

  static verifyToken(
    token: string,
    secretSignature: string
  ): string | JwtPayload {
    try {
      return JWT.verify(token, secretSignature);
    } catch (error) {
      throw new APIError(`Failed to verify token: ${String(error)}`);
    }
  }

  static isTokenExpired(error: unknown): boolean {
    return (
      error instanceof JWT.TokenExpiredError ||
      (error instanceof Error && error.message.includes("jwt expired"))
    );
  }
}
