import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  AnchorsAnalys,
  metadata,
  payloadDTO,
  ResponsePayload,
  TextAnalysis,
} from 'src/utils/customTypes';
import {
  extractTextFromBody,
  processAnchors,
  processFileContent,
  getMetadata,
  checkUrlMalformed,
} from '../utils/functions';
import { FourZeroFourException } from '../security/FourZeroFourException';
import { CannotProcessFileError } from '../security/CannotProcessFileError';
import { AccesDeniedException } from '../security/AccesDeniedException';
import { EmptyPayloadException } from '../security/EmptyPayloadException';
import { RequestPageTiltedError } from '../security/RequestPageTiltedError';
import { MalformedUrlException } from '../security/MalformedUrlException';

@Injectable()
export class ScraperService {
  async scrap(payload: payloadDTO): Promise<ResponsePayload> {
    let rispostaFetchAxios: AxiosResponse<string, payloadDTO> | undefined;
    if (payload.urlToScrape === '') {
      throw new EmptyPayloadException();
    }

    // Lancia un errore se l'Url non inizia con http o https e non finisce con .letteralettera o .letteraletteralettera
    if (checkUrlMalformed(payload.urlToScrape)) {
      throw new MalformedUrlException(payload.urlToScrape);
    }

    try {
      // Fai una richiesta GET alla URL specificata
      rispostaFetchAxios = await axios.get(payload.urlToScrape);
      // L'oggetto rispostaFetchAxios contiene il contenuto HTML della pagina <contenuto pagina aka html stringato, payloadrichiesta>
    } catch (error) {
      if (error.code === `ENOTFOUND`) {
        throw new MalformedUrlException(payload.urlToScrape);
      }

      if (error.response.status === 404) {
        throw new FourZeroFourException(payload.urlToScrape);
      }

      if (error.response.status === 473) {
        throw new PayloadTooLargeException(payload.urlToScrape);
      }

      if (error.response.status === 500) {
        throw new RequestPageTiltedError(payload.urlToScrape);
      }

      if (
        error.response.status === 429 ||
        error.response.status === 403 ||
        error.response.status === 999
      ) {
        throw new AccesDeniedException(payload.urlToScrape);
      }
    }

    let testo = '';
    let analisiParole: TextAnalysis;
    let analisiAncora: AnchorsAnalys;
    let metadata: metadata;

    try {
      testo = await extractTextFromBody(rispostaFetchAxios.data);
    } catch (error) {
      throw new CannotProcessFileError(payload.urlToScrape);
    } finally {
      analisiParole = processFileContent(testo);
      analisiAncora = await processAnchors(rispostaFetchAxios.data);
      metadata = await getMetadata(
        rispostaFetchAxios.data,
        payload.urlToScrape,
      );
      const response: ResponsePayload = {
        analisiParole,
        analisiLink: analisiAncora,
        metadata: metadata,
      };
      return response;
    }
  }
}
