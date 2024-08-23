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
} from '../utils/functions';
import { FourZeroFourException } from '../security/FourZeroFourException';
import { CannotProcessFileError } from '../security/CannotProcessFileError';
import { AccesDeniedException } from '../security/AccesDeniedException';
import { EmptyPayload } from '../security/EmptyPayload';
import { RequestPageTiltedError } from 'src/security/RequestPageTiltedError';

@Injectable()
export class ScraperService {
  async scrap(payload: payloadDTO): Promise<ResponsePayload> {
    let rispostaFetchAxios: AxiosResponse<string, payloadDTO> | undefined;
    if (payload.urlToScrape === '') {
      throw new EmptyPayload();
    }
    try {
      // Fai una richiesta GET alla URL specificata
      rispostaFetchAxios = await axios.get(payload.urlToScrape);
      // L'oggetto rispostaFetchAxios contiene il contenuto HTML della pagina <contenuto pagina aka html stringato, payloadrichiesta>
    } catch (error) {
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
      console.log(error);
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
