import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { useContainer, type ValidationError } from "class-validator";

import { AppModule } from "@src/app.module";
import { TransformerInterceptor } from "@src/interceptors/transformer/transformer.interceptor";
import { ResponseHandler } from "@src/utils/response-handler";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          [error.property]: Object.values(error.constraints),
        }));
        return new BadRequestException(
          ResponseHandler.error({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Validation failed",
            errors: formattedErrors,
          })
        );
      },
    })
  );

  app.useGlobalInterceptors(new TransformerInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix("api/v1");
  app.enableCors();
  await app.listen(process.env.PORT ?? 8001);
};
bootstrap();
