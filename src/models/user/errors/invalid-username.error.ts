import { UserError } from './user.error';

export class InvalidUsernameError extends UserError {
  public readonly name = this.constructor.name;
}
