export enum ErrorCode {
  TokenError = -1,
  Success = 0,
  ServerError = 1,
}

export interface Res<T> {
  code: ErrorCode;
  message: string;
  data: T;
}
