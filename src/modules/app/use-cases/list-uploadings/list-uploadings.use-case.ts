import { PrismaClient, Uploading, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { filterCompleteUploadingOwnedBy } from '@/models/uploading/filters';
import { FileService } from '@/modules/file/services/file';

export interface ListUploadingsUseCaseOptions {
  page: number;
  owner: User;
}

export type ListUploadingsUseCaseResult = {
  numberOfPages: number;
  hasNextPage: boolean;
  data: UploadingWithURL[];
};

export interface UploadingWithURL extends Uploading {
  url: string;
}

@Injectable()
export class ListUploadingsUseCase {
  private readonly PAGE_SIZE = 10;

  constructor(private prisma: PrismaClient, private fileService: FileService) {}

  async execute(
    options: ListUploadingsUseCaseOptions
  ): Promise<ListUploadingsUseCaseResult> {
    const [{ numberOfPages, hasNextPage }, data] = await Promise.all([
      this.getMeta(options),
      this.getData(options)
    ]);
    return { numberOfPages, hasNextPage, data };
  }

  private async getMeta({ page, owner }: ListUploadingsUseCaseOptions) {
    const numberOfUploadings = await this.prisma.uploading.count({
      where: filterCompleteUploadingOwnedBy({ owner })
    });
    const numberOfPages = Math.ceil(numberOfUploadings / this.PAGE_SIZE);
    const hasNextPage = page < numberOfPages;
    return { numberOfPages, hasNextPage };
  }

  private async getData({ page, owner }: ListUploadingsUseCaseOptions) {
    const foundUploadings = await this.prisma.uploading.findMany({
      where: filterCompleteUploadingOwnedBy({ owner }),
      orderBy: { id: 'desc' },
      skip: (page - 1) * this.PAGE_SIZE,
      take: this.PAGE_SIZE
    });
    return foundUploadings.map((uploading) => ({
      ...uploading,
      url: this.fileService.buildFileURL({ path: uploading.effectiveName })
    }));
  }
}
