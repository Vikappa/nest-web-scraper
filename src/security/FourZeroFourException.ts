import { HttpException, HttpStatus } from '@nestjs/common';

export class FourZeroFourException extends HttpException {
  constructor(resource: string) {
    super(`${resource} not found`, HttpStatus.NOT_FOUND);
  }
}
