import { UploadingError } from './uploading.error';

export class InvalidOriginalNameError extends UploadingError {
  public readonly name = this.constructor.name;
}
