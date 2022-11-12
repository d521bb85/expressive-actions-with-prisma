const USERNAME_PATTERN = /^[a-z0-9_.]{4,24}$/;

export function isValidUsername(username: string) {
  return !!username && USERNAME_PATTERN.test(username);
}
