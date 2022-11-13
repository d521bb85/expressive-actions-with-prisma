import { PrismaClient, Uploading } from '@prisma/client';
import { UploadingStatus } from '../constants';

export interface CompleteUploadingOptions {
  uploading: Uploading;
  destination: string;
  size: number;
  mimeType: string;
}

export function completeUploading(
  prisma: PrismaClient,
  { uploading, destination, size, mimeType }: CompleteUploadingOptions
) {
  return prisma.uploading.update({
    where: { id: uploading.id },
    data: {
      status: UploadingStatus.Ready,
      file: {
        create: { destination, size, mimeType }
      }
    },
    include: { file: true }
  });
}
