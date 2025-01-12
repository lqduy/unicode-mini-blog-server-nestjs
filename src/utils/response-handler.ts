import { HttpStatus } from "@nestjs/common";

import {
  type ErrorResponse,
  type SuccessResponse,
} from "@src/schemas/response";

export class ResponseHandler {
  static success({
    data,
    statusCode = HttpStatus.OK,
    message = "success",
  }: SuccessResponse) {
    return {
      statusCode,
      message,
      data,
    };
  }

  static error({
    errors,
    statusCode = HttpStatus.BAD_REQUEST,
    message = "error",
    stack,
  }: ErrorResponse) {
    return {
      statusCode,
      message,
      errors,
      stack: stack
        ? stack
            .split("\n")
            .slice(1)
            .map((line) => line.trim())
        : undefined,
    };
  }
}
