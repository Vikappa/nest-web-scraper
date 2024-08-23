import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotProcessFileError extends HttpException {
  constructor(resource: string) {
    super(
      `Non sono riuscito a processare il contenuto della pagina ${resource}`,
      HttpStatus.PAYLOAD_TOO_LARGE,
    );
  }
}
