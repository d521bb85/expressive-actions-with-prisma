import { PrismaClient, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { signUpUser } from '@/models/user/methods';
import { UsernameIsTakenError } from './sign-up-user.error';

export interface SignUpUserUseCaseOptions {
  username: string;
}

export interface SignUpUserUseCaseResult {
  user: User;
}

@Injectable()
export class SignUpUserUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute({
    username
  }: SignUpUserUseCaseOptions): Promise<SignUpUserUseCaseResult> {
    const usernameIsTaken =
      (await this.prisma.user.count({
        where: { username }
      })) > 0;
    if (usernameIsTaken) {
      throw new UsernameIsTakenError();
    }

    const user = await signUpUser(this.prisma, { username });
    return { user };
  }
}
