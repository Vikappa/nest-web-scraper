import { HttpException, HttpStatus } from '@nestjs/common';

export class RequestPageTiltedError extends HttpException {
  constructor(resource: string) {
    super(
      `La pagina ${resource} è andata in errore, dove mi hai mandato?`,
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
