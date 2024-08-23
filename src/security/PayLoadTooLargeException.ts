import { HttpException, HttpStatus } from '@nestjs/common';

export class PayloadTooLargeException extends HttpException {
  constructor(resource: string) {
    super(
      `Ooooooff! ${resource} è così grosso che non riesco a processare il contenuto della pagina! Probabilmente si tratta di un sistema antiscraping che fa gonfiare le pagine per renderle visualizzabili solo da browser`,
      HttpStatus.PAYLOAD_TOO_LARGE,
    );
  }
}
