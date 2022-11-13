import { S3 } from '@aws-sdk/client-s3';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FileModuleOptions } from './interfaces';
import { FILE_MODULE_OPTIONS_TOKEN } from './constants';
import { FileService, S3FileService } from './services/file';

@Module({})
export class FileModule {
  static forRoot({ useFactory, inject }: ForRootOptions): DynamicModule {
    return {
      module: this,
      providers: [
        {
          useFactory,
          inject,
          provide: FILE_MODULE_OPTIONS_TOKEN
        },
        this.buildS3Provider(),
        {
          provide: FileService,
          useClass: S3FileService
        }
      ],
      exports: [FileService]
    };
  }

  private static buildS3Provider(): Provider {
    return {
      provide: S3,
      useFactory: ({ s3 }: FileModuleOptions) => {
        const { endpoint, region, accessKeyId, secretAccessKey } = s3;
        return new S3({
          endpoint,
          region,
          credentials: { accessKeyId, secretAccessKey },
          forcePathStyle: true
        });
      },
      inject: [FILE_MODULE_OPTIONS_TOKEN]
    };
  }
}

export interface ForRootOptions {
  useFactory: (...args: any[]) => FileModuleOptions;
  inject: any[];
}
