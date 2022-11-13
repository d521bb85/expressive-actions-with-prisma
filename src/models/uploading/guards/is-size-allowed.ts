const SIZE_10MB = 10 * 1024 * 1024;

export function isSizeAllowed(size: number) {
  return size > 0 && size < SIZE_10MB;
}
