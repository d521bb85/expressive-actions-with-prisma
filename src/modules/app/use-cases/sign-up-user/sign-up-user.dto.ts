import { Exclude, Expose } from 'class-transformer';

export class SignUpUserDTO {
  username: string;
}

@Exclude()
export class SignUpUserResponseDTO {
  @Expose()
  createdAt: string;

  @Expose()
  username: string;

  @Expose()
  token: string;
}
