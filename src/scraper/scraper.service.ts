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
import { AccesDeniedException } from 'src/security/AccesDeniedException';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class ScraperService {
  constructor(private readonly loggingService: LoggingService) {} // Inietta il servizio di logging

  async scrap(payload: payloadDTO): Promise<ResponsePayload> {
    let rispostaFetchAxios: AxiosResponse<string, payloadDTO> | undefined;
    this.loggingService.logRequest(payload.urlToScrape, payload);

    try {
      rispostaFetchAxios = await axios.get(payload.urlToScrape);
    } catch (error) {
      if (error.response.status === 404) {
        this.loggingService.logError(payload.urlToScrape, error);
        throw new FourZeroFourException(payload.urlToScrape);
      }

      if (error.response.status === 473) {
        this.loggingService.logError(payload.urlToScrape, error);
        throw new PayloadTooLargeException(payload.urlToScrape);
      }

      if (
        error.response.status === 429 ||
        error.response.status === 403 ||
        error.response.status === 999
      ) {
        this.loggingService.logError(payload.urlToScrape, error);
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
      this.loggingService.logError(payload.urlToScrape, error);
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

      this.loggingService.logResponse(payload.urlToScrape, response);
      return response;
    }
  }
}
