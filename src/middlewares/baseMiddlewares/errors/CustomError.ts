class CustomError extends Error {
  statusCode: number;
  originalError: Error | unknown; 

  constructor(statusCode: number, message: string, originalError?: Error | unknown) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError || {}; 
    this.name = this.constructor.name;
  }
}

export default CustomError;
