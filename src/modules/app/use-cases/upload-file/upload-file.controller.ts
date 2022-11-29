import { User } from '@prisma/client';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadingError } from '@/models/uploading/errors';
import { AuthenticatedGuard, AuthenticatedUser } from '../../auth';
import { UploadFileUseCase } from './upload-file.use-case';

@Controller()
export class UploadFileController {
  constructor(private uploadFileUseCase: UploadFileUseCase) {}

  @Post('uploadings')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('file'))
  async execute(
    @AuthenticatedUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      await this.uploadFileUseCase.execute({
        file: file.buffer,
        originalName: file.originalname,
        contentType: file.mimetype,
        size: file.size,
        owner: user
      });
    } catch (error) {
      if (error instanceof UploadingError) {
        throw new BadRequestException({ reason: error.name });
      }
      throw error;
    }
  }
}
