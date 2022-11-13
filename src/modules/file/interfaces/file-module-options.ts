import { S3Options } from './s3-options';

export interface FileModuleOptions {
  s3: S3Options;
  publicBaseURL: string;
}
