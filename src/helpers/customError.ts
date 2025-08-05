export class customError extends Error {
  public errorKey: string;
  public errorMessage: string;

  constructor(errorKey: string, errorMessage: string) {
    super(errorMessage);
    this.errorKey = errorKey;
    this.errorMessage = errorMessage;
  }
}
