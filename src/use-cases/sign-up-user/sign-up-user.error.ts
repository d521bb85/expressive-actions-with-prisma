export class SignUpUserError extends Error {}

export class UsernameIsTakenError extends SignUpUserError {
  public readonly name = this.constructor.name;
}
