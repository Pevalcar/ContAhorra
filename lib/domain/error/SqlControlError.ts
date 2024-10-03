export class SQLiteControlError {
  static getError(error: any) {
    console.info("error SQLite Control error " + error);
    return new Error(error);
  }
}
