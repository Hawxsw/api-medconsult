interface ErrorData {
  message: string;
  userstatus: string;
  missingFields?: string[];
}

class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly userstatus: string;
  public readonly missingFields?: string[];

  constructor(data: ErrorData | string, statusCode = 400) {
    if (typeof data === 'string') {
      this.message = data;
      this.userstatus = 'error';
    } else {
      this.message = data.message;
      this.userstatus = data.userstatus;
      this.missingFields = data.missingFields;
    }
    this.statusCode = statusCode;
  }
}

export default AppError;
