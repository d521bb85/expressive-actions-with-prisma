import { PrismaClient, Uploading } from '@prisma/client';
import { UploadingStatus } from '../constants';

export interface CompleteUploadingOptions {
  uploading: Uploading;
}

export function completeUploading(
  prisma: PrismaClient,
  { uploading }: CompleteUploadingOptions
) {
  return prisma.uploading.update({
    where: { id: uploading.id },
    data: { status: UploadingStatus.Complete }
  });
}
