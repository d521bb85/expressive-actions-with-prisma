import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsPositive, ValidateNested } from 'class-validator';

export class ListUploadingsDTO {
  @IsNumber()
  @IsPositive()
  @Transform(() => Number)
  page: number = 1;
}

@Exclude()
export class ListUploadingsResponseDTO {
  @Expose()
  numberOfPages: number;

  @Expose()
  hasNextPage: boolean;

  @Expose()
  @Type(() => ListUploadingsResponseDTODataEntry)
  data: ListUploadingsResponseDTODataEntry[];
}

@Exclude()
export class ListUploadingsResponseDTODataEntry {
  @Expose()
  createdAt: string;

  @Expose()
  pid: string;

  @Expose()
  originalName: string;

  @Expose()
  url: string;

  @Expose()
  contentType: string;

  @Expose()
  size: number;
}
