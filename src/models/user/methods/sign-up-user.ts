import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { InvalidUsernameError } from '../errors';
import { isValidUsername } from '../guards';

export interface SignUpUserOptions {
  username: string;
}

export function signUpUser(
  prisma: PrismaClient,
  { username }: SignUpUserOptions
) {
  if (!isValidUsername(username)) {
    throw new InvalidUsernameError();
  }
  const token = nanoid(128);
  return prisma.user.create({
    data: { username, token }
  });
}
