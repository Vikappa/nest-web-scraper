import { HttpException, HttpStatus } from '@nestjs/common';

export class MalformedUrlException extends HttpException {
  constructor(resource: string) {
    super(`L'URL ${resource} non è valido`, HttpStatus.BAD_REQUEST);
  }
}
