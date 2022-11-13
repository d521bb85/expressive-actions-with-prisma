import path from 'path';
import { nanoid } from 'nanoid';
import { slugify } from 'transliteration';
import { PrismaClient, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { beginUploading } from '@/models/uploading/methods';
import { FileService } from '@/modules/file/services/file';
import { completeUploading } from '@/models/uploading/methods/complete-uploading';
import { failUploading } from '@/models/uploading/methods/fail-uploading';

export interface UploadFileUseCaseOptions {
  file: Buffer;
  originalName: string;
  contentType: string;
  size: number;
  owner: User;
}

@Injectable()
export class UploadFileUseCase {
  constructor(private prisma: PrismaClient, private fileService: FileService) {}

  async execute({
    file,
    originalName,
    contentType,
    size,
    owner
  }: UploadFileUseCaseOptions) {
    const uploading = await beginUploading(this.prisma, {
      originalName,
      contentType,
      size,
      owner
    });
    try {
      await this.fileService.uploadFile({
        file,
        contentType,
        destination: uploading.effectiveName
      });
      await completeUploading(this.prisma, { uploading });
    } catch (error) {
      if (error instanceof Error) {
        await failUploading(this.prisma, { uploading });
      }
      throw error;
    }
  }
}
