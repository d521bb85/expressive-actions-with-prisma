import { SignUpUserController, SignUpUserUseCase } from './sign-up-user';
import { UploadFileController, UploadFileUseCase } from './upload-file';

export const useCases = {
  controllers: [SignUpUserController, UploadFileController],
  providers: [SignUpUserUseCase, UploadFileUseCase]
};
