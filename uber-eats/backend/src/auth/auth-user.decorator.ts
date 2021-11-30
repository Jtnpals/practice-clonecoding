import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqkContext = GqlExecutionContext.create(context).getContext();
    const user = gqkContext['user'];
    return user;
  },
);
