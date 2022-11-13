export const ALLOWED_MIME_TYPE_PATTERN = /^(image|audio|video)/;

export function isMIMETypeAllowed(mimeType: string) {
  return ALLOWED_MIME_TYPE_PATTERN.test(mimeType);
}
