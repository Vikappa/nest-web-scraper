import { HttpException, HttpStatus } from '@nestjs/common';

export class AccesDeniedException extends HttpException {
  constructor(resource: string) {
    super(
      `La pagina ${resource} mi ha chiuso la porta in faccia! Hanno dei sistemi anti-scraping per controllare che io sia un umano o un robot?`,
      HttpStatus.PAYLOAD_TOO_LARGE,
    );
  }
}
