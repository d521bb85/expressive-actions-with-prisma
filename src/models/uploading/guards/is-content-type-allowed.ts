export const ALLOWED_CONTENT_TYPE_PATTERN = /^(image|audio|video)/;

export function isContentTypeAllowed(contentType: string) {
  return ALLOWED_CONTENT_TYPE_PATTERN.test(contentType);
}
