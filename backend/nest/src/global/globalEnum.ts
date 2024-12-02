export enum HttpStatus {
  ERROR = 500, // Internal Server Error
  SUCCESS = 200, // Success OK
  CREATED = 201, // Created
  NOT_FOUND = 404, // Not Found
  FORBIDDEN = 403, // Forbidden
}

export enum HttpMessage {
  ERROR = 'Server Internal Error',
  SUCCESS = 'Server Response Success',
  NOT_FOUND = 'Resource Not Found',
}