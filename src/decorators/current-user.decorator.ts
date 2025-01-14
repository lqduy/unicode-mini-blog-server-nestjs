import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

import type { UserJwtPayload } from "@src/schemas/common";

const CurrentUser = createParamDecorator(
  (data: keyof UserJwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserJwtPayload = request.user;

    return data ? user?.[data] : user;
  }
);

export default CurrentUser;
