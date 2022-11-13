import { User } from '@prisma/client';
import { Request } from 'express';

const vault = new WeakMap<Request, User>();

export function bindUserToRequest(request: Request, user: User): void {
  vault.set(request, user);
}

export function getUserBoundToRequest(request: Request): User | undefined {
  return vault.get(request);
}
