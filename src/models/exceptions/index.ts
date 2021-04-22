export class HttpException extends Error {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
