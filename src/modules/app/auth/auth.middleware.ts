import { PrismaClient } from '@prisma/client';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { bindUserToRequest } from './vault';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaClient) {}

  async use(request: Request, response: Response, next: (error?: any) => void) {
    const maybeToken = this.getToken(request);
    if (maybeToken) {
      const maybeUser = await this.findUser(maybeToken);
      if (maybeUser) {
        bindUserToRequest(request, maybeUser);
      }
    }
    next();
  }

  private getToken(request: Request) {
    const { authorization } = request.headers;
    if (authorization) {
      const [scheme, token] = authorization.split(/\s/);
      if (scheme.toLowerCase() === 'bearer' && token) {
        return token;
      }
    }
    return undefined;
  }

  private findUser(token: string) {
    return this.prisma.user.findUnique({
      where: { token }
    });
  }
}
