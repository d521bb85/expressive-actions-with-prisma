import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { beginUploading } from '../../models/uploading/methods';

export interface UploadFileUseCaseOptions {
  file: Buffer;
  name: string;
  mimeType: string;
  size: number;
}

@Injectable()
export class UploadFileUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute({ file, name, mimeType, size }: UploadFileUseCaseOptions) {
    const uploading = await beginUploading(this.prisma, {
      name,
      mimeType,
      size
    });
  }
}
