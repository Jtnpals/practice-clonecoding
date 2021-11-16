import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqkContext = GqlExecutionContext.create(context).getContext();
    const user = gqkContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
