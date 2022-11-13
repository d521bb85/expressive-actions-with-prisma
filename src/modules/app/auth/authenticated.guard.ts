import { Observable } from 'rxjs';
import { Request } from 'express';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { getUserBoundToRequest } from './vault';

export class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return !!getUserBoundToRequest(request);
  }
}
