import { HttpException, HttpStatus } from '@nestjs/common';

export class FourZeroFourException extends HttpException {
  constructor(resource: string) {
    super(`La pagina ${resource} non è stata trovata`, HttpStatus.NOT_FOUND);
  }
}
