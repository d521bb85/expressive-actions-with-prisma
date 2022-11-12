import { SignUpUserController, SignUpUserUseCase } from './sign-up-user';

export const useCases = {
  controllers: [SignUpUserController],
  providers: [SignUpUserUseCase]
};
