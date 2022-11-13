import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { UploadingStatus } from '../constants';
import { isMIMETypeAllowed, isSizeAllowed, isValidName } from '../guards';
import {
  InvalidNameError,
  UnallowedMIMETypeError,
  UnallowedSizeError
} from '../errors';

export interface BeginUploadingOptions {
  name: string;
  mimeType: string;
  size: number;
}

export function beginUploading(
  prisma: PrismaClient,
  { name, mimeType, size }: BeginUploadingOptions
) {
  if (!isValidName(name)) {
    throw new InvalidNameError();
  }
  if (isMIMETypeAllowed(mimeType)) {
    throw new UnallowedMIMETypeError();
  }
  if (isSizeAllowed(size)) {
    throw new UnallowedSizeError();
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
