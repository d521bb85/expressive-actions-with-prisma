import { UploadingError } from './uploading.error';

export class UnallowedContentTypeError extends UploadingError {
  public readonly name = this.constructor.name;
}
