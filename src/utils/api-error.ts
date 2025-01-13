import { HttpStatus } from "@nestjs/common";

export class APIError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = HttpStatus.BAD_REQUEST) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
