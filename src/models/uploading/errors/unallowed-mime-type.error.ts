import { UploadingError } from './uploading.error';

export class UnallowedMIMETypeError extends UploadingError {
  public readonly name = this.constructor.name;
}
