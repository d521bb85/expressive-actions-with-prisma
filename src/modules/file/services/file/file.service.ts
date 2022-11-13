export abstract class FileService {
  abstract uploadFile(options: UploadFileOptions): Promise<void>;
}

export interface UploadFileOptions {
  file: Buffer;
  contentType: string;
  destination: string;
}
