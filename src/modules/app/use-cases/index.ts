import { SignUpUserController, SignUpUserUseCase } from './sign-up-user';
import { UploadFileController, UploadFileUseCase } from './upload-file';
import {
  ListUploadingsController,
  ListUploadingsUseCase
} from './list-uploadings';

export const useCases = {
  controllers: [
    SignUpUserController,
    UploadFileController,
    ListUploadingsController
  ],
  providers: [SignUpUserUseCase, UploadFileUseCase, ListUploadingsUseCase]
};
