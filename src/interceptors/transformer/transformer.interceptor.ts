import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Response } from "express";
import { map, Observable } from "rxjs";
import { SuccessResponse } from "src/schemas/response";
import { ResponseHandler } from "src/utils/response-handler";

const NO_RETURN: SuccessResponse = {
  data: null,
  message: "no return",
};

@Injectable()
export class TransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse();

    return next.handle().pipe(
      map((data: SuccessResponse) => {
        // case: no return
        if (!data) {
          return ResponseHandler.success(NO_RETURN);
        }

        // case: error
        if (data && data instanceof Error) {
          const errorStatusCode = data.statusCode || HttpStatus.BAD_REQUEST;
          response.status(errorStatusCode);

          const isDev = true; // process.env.NODE_ENV === 'development';

          return ResponseHandler.error({
            statusCode: errorStatusCode,
            message: data.message,
            stack: isDev ? data.stack : undefined, // return stack only in development
          });
        }

        // case: success without formation
        if (data && !data.data) {
          return ResponseHandler.success({
            statusCode: HttpStatus.OK,
            message: "success",
            data,
          });
        }

        // case: success with formation
        const successStatusCode = data.statusCode || HttpStatus.OK;
        response.status(successStatusCode);
        return data;
      })
    );
  }
}
