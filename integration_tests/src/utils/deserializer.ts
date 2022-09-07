import { decode } from './base64url';
export const deserialize = (base64String: string) =>
  JSON.parse(decode(base64String));
