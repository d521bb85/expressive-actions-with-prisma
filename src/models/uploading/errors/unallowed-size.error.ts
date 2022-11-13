import { UploadingError } from './uploading.error';

export class UnallowedSizeError extends UploadingError {
  public readonly name = this.constructor.name;
}
