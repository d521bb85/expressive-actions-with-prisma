import { User } from '@prisma/client';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { TransformResponseInterceptor } from '@/shared/interceptors/transform-response';
import { AuthenticatedGuard, AuthenticatedUser } from '../../auth';
import {
  ListUploadingsDTO,
  ListUploadingsResponseDTO
} from './list-uploadings.dto';
import { ListUploadingsUseCase } from './list-uploadings.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class ListUploadingsController {
  constructor(private listUploadingsUserCase: ListUploadingsUseCase) {}

  @Get('uploadings')
  @UseInterceptors(new TransformResponseInterceptor(ListUploadingsResponseDTO))
  execute(
    @AuthenticatedUser() user: User,
    @Query() { page }: ListUploadingsDTO
  ) {
    return this.listUploadingsUserCase.execute({
      page,
      owner: user
    });
  }
}
