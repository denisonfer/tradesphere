import { decode as decodeBase64 } from 'base-64';
import { decode as decodeUTF8 } from 'utf8';

export function decodeJWT(token: string | null | undefined): any {
  if (!token) return null;

  const payload = token.split('.')[1];
  if (!payload) return null;
  try {
    return JSON.parse(decodeUTF8(decodeBase64(payload)));
  } catch (error) {
    return null;
  }
}
