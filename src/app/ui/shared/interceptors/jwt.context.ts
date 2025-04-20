import { HttpContext, HttpContextToken } from "@angular/common/http";

export const INCLUDE_JWT = new HttpContextToken<boolean>(() => true)

export function excludeJwt() {
  return new HttpContext().set(INCLUDE_JWT, false)
}