import { AccesDeniedException } from './AccesDeniedException';
import { CannotProcessFileError } from './CannotProcessFileError';
import { EmptyPayloadException } from './EmptyPayloadException';
import { FourZeroFourException } from './FourZeroFourException';
import { MalformedUrlException } from './MalformedUrlException';
import { RequestPageTiltedError } from './RequestPageTiltedError';
import { PayloadTooLargeException } from './PayLoadTooLargeException';

describe('Controlla le eccezzioni personalizzate', () => {
  it('Controllo AccessDeniedException', () => {
    const exception = new AccesDeniedException(
      'https://vincenzocostantinicvnext.vercel.app/',
    );
    expect(exception.message).toBe(
      'La pagina https://vincenzocostantinicvnext.vercel.app/ mi ha chiuso la porta in faccia! Hanno dei sistemi anti-scraping per controllare che io sia un umano o un robot?',
    );
    expect(exception.getStatus()).toBe(413);
  });
  it('Controllo CannotProcessFileError', () => {
    const file = '../../media/webscraperlogo.png';
    const exception = new CannotProcessFileError(file);
    expect(exception.message).toBe(
      `Non sono riuscito a processare il contenuto della pagina ${file}`,
    );
    expect(exception.getStatus()).toBe(413);
  });
  it('Controllo EmptyPayloadException', () => {
    const exception = new EmptyPayloadException();
    expect(exception.message).toBe('Mi hai mandato un payload vuoto!');
    expect(exception.getStatus()).toBe(400);
  });
  it('Controllo FourZeroFourException', () => {
    const exception = new FourZeroFourException(
      'https://vincenzocostantinicvnext.vercel.app',
    );
    expect(exception.message).toBe(
      'La pagina https://vincenzocostantinicvnext.vercel.app non è stata trovata',
    );
    expect(exception.getStatus()).toBe(404);
  });
  it('Controllo MalformedUrlException', () => {
    const exception = new MalformedUrlException(
      'hs://vincenzocostantinicvnext.vercel.app',
    );
    expect(exception.message).toBe(
      "L'URL hs://vincenzocostantinicvnext.vercel.app non è valido",
    );
    expect(exception.getStatus()).toBe(400);
  });
  it('Controllo RequestPageTiltedError', () => {
    const resource = 'https://vincenzocostantinicvnext.vercel.app';
    const exception = new RequestPageTiltedError(resource);
    expect(exception.message).toBe(
      `La pagina ${resource} è andata in errore, dove mi hai mandato?`,
    );
    expect(exception.getStatus()).toBe(501);
  });
  it('Controllo PayloadTooLargeException', () => {
    const resource = 'https://vincenzocostantinicvnext.vercel.app';
    const exception = new PayloadTooLargeException(resource);
    expect(exception.message).toBe(
      `Ooooooff! ${resource} è così grosso che non riesco a processare il contenuto della pagina! Probabilmente si tratta di un sistema antiscraping che fa gonfiare le pagine per renderle visualizzabili solo da browser`,
    );
    expect(exception.getStatus()).toBe(413);
  });
});
