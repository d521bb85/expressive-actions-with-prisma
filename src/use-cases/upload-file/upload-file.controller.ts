import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from './upload-file.use-case';

@Controller()
export class UploadFileController {
  constructor(private uploadFileUseCase: UploadFileUseCase) {}

  @Post('uploadings')
  @UseInterceptors(FileInterceptor('file'))
  async execute(@UploadedFile() file: Express.Multer.File) {
    try {
      await this.uploadFileUseCase.execute({
        file: file.buffer,
        name: file.filename,
        mimeType: file.mimetype,
        size: file.size
      });
    } catch (error) {
      throw error;
    }
  }
}
