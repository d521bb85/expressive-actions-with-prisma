import { PrismaClient, Uploading } from '@prisma/client';
import { UploadingStatus } from '../constants';

export interface FailUploadingOptions {
  uploading: Uploading;
}

export function failUploading(
  prisma: PrismaClient,
  { uploading }: FailUploadingOptions
) {
  return prisma.uploading.update({
    where: { id: uploading.id },
    data: { status: UploadingStatus.Failed }
  });
}
