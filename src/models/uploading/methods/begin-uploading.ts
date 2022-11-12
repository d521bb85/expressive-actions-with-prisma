import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { UploadingStatus } from '../constants';
import { isValidName } from '../guards';
import { InvalidNameError } from '../errors';

export interface BeginUploadingOptions {
  name: string;
}

export function beginUploading(
  prisma: PrismaClient,
  { name }: BeginUploadingOptions
) {
  if (!isValidName(name)) {
    throw new InvalidNameError();
  }
  const pid = nanoid(32);
  return prisma.uploading.create({
    data: {
      pid,
      name,
      status: UploadingStatus.Pending
    }
  });
}
