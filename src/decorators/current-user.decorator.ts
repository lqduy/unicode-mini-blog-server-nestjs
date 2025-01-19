import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

import type { UserJwtPayload } from "@src/schemas/common";

const CurrentUser = createParamDecorator(
  (field: keyof UserJwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserJwtPayload = request.user;

    return field ? user?.[field] : user;
  }
);

export default CurrentUser;
