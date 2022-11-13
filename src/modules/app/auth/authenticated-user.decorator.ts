import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { getUserBoundToRequest } from './vault';

export const AuthenticatedUser = createParamDecorator(function User(
  _: unknown,
  context: ExecutionContext
) {
  const request = context.switchToHttp().getRequest<Request>();
  return getUserBoundToRequest(request);
});
