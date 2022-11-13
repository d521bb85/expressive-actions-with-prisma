import path from 'path';
import { nanoid } from 'nanoid';
import { slugify } from 'transliteration';
import { PrismaClient, User } from '@prisma/client';
import { UploadingStatus } from '../constants';
import {
  isContentTypeAllowed,
  isSizeAllowed,
  isOriginalNameValid
} from '../guards';
import {
  InvalidOriginalNameError,
  UnallowedContentTypeError,
  UnallowedSizeError
} from '../errors';

export interface BeginUploadingOptions {
  originalName: string;
  contentType: string;
  size: number;
  owner: User;
}

export function beginUploading(
  prisma: PrismaClient,
  { originalName, contentType, size, owner }: BeginUploadingOptions
) {
  if (!isOriginalNameValid(originalName)) {
    throw new InvalidOriginalNameError();
  }
  if (!isContentTypeAllowed(contentType)) {
    throw new UnallowedContentTypeError();
  }
  if (!isSizeAllowed(size)) {
    throw new UnallowedSizeError();
  }
  const pid = nanoid(32);
  const effectiveName = buildEffectiveName(pid, originalName);
  return prisma.uploading.create({
    data: {
      pid,
      originalName,
      effectiveName,
      contentType,
      size,
      status: UploadingStatus.Pending,
      owner: {
        connect: { id: owner.id }
      }
    }
  });
}

function buildEffectiveName(pid: string, originalName: string) {
  const { name: basename, ext } = path.parse(originalName);
  return `${pid}-${slugify(basename)}${ext}`;
}
