import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { TransformResponseInterceptor } from 'src/interceptors/transform-response';
import { UserError } from '../../models/user/errors';
import { SignUpUserDTO, SignUpUserResponseDTO } from './sign-up-user.dto';
import { SignUpUserError } from './sign-up-user.error';
import { SignUpUserUseCase } from './sign-up-user.use-case';

@Controller()
export class SignUpUserController {
  constructor(private signUpUserUseCase: SignUpUserUseCase) {}

  @Post('user')
  @UseInterceptors(new TransformResponseInterceptor(SignUpUserResponseDTO))
  async execute(@Body() { username }: SignUpUserDTO) {
    try {
      const { user } = await this.signUpUserUseCase.execute({ username });
      return user;
    } catch (error) {
      if (error instanceof UserError || error instanceof SignUpUserError) {
        throw new BadRequestException({ reason: error.name });
      }
      throw error;
    }
  }
}
