import { PrismaClient, Uploading } from '@prisma/client';
import { UploadingStatus } from '../constants';

export interface CompleteUploadingOptions {
  uploading: Uploading;
  destination: string;
  size: number;
  mime: string;
}

export function completeUploading(
  prisma: PrismaClient,
  { uploading, destination, size, mime }: CompleteUploadingOptions
) {
  return prisma.uploading.update({
    where: { id: uploading.id },
    data: {
      status: UploadingStatus.Ready,
      file: {
        create: { destination, size, mime }
      }
    },
    include: { file: true }
  });
}
