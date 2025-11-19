export interface Logger {
  warn(mergingObject?: object, message?: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  error(message: string, error: Error, ...args: unknown[]): void;
  debug(mergingObject?: object, message?: string, ...args: unknown[]): void;
}
