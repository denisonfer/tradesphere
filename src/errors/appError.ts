export class AppError<T = any> extends Error {
  public readonly ignoreLog: boolean;
  protected readonly extraData: T | null;
  constructor(message: string, extraData: T, ignoreLog = true) {
    super(message);
    this.ignoreLog = ignoreLog;
    this.extraData = extraData || null;
  }
}
