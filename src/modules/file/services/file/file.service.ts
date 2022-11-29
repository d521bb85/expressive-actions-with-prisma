export abstract class FileService {
  abstract uploadFile(options: UploadFileOptions): Promise<void>;

  abstract buildFileURL(options: BuildFileURL): string;
}

export interface UploadFileOptions {
  file: Buffer;
  contentType: string;
  destination: string;
}

export interface BuildFileURL {
  path: string;
}
