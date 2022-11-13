import { S3 } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { FileModuleOptions } from '../../interfaces';
import { FILE_MODULE_OPTIONS_TOKEN } from '../../constants';
import { FileService, UploadFileOptions } from './file.service';

@Injectable()
export class S3FileService implements FileService {
  private bucket = this.moduleOptions.s3.bucket;

  private publicBaseURL = this.moduleOptions.publicBaseURL;

  constructor(
    @Inject(FILE_MODULE_OPTIONS_TOKEN) private moduleOptions: FileModuleOptions,
    private s3: S3
  ) {}

  async uploadFile({
    file,
    contentType,
    destination
  }: UploadFileOptions): Promise<void> {
    await this.s3.putObject({
      Bucket: this.bucket,
      Key: destination,
      Body: file,
      ContentType: contentType,
      ACL: 'public-read'
    });
  }
}
