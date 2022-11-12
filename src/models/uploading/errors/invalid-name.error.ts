import { UploadingError } from './uploading.error';

export class InvalidNameError extends UploadingError {
  public readonly name = this.constructor.name;
}
