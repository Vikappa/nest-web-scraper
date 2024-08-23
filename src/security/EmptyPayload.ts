import { HttpException, HttpStatus } from '@nestjs/common';

export class EmptyPayload extends HttpException {
  constructor() {
    super(`Mi hai mandato un payload vuoto!`, HttpStatus.BAD_REQUEST);
  }
}
