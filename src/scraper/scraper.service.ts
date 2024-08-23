import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { payloadDTO, ResponsePayload } from 'src/utils/customTypes';
import {
  extractTextFromBody,
  processAnchors,
  processFileContent,
  getMetadata,
} from '../utils/functions';
import { FourZeroFourException } from '../security/FourZeroFourException';

@Injectable()
export class ScraperService {
  async scrap(payload: payloadDTO): Promise<ResponsePayload> {
    let data: AxiosResponse<string, payloadDTO> | undefined;
    try {
      // Fai una richiesta GET alla URL specificata
      data = await axios.get(payload.urlToScrape);
      // L'oggetto data contiene il contenuto HTML della pagina
    } catch (error) {
      if (error.response.status === 404) {
        throw new FourZeroFourException(payload.urlToScrape);
      }
    }
    // Prende come input il payload della fetch e ritorna una stringa con il testo da analizzare
    const testo = extractTextFromBody(data.data);
    const analisiParole = processFileContent(await testo);
    const analisiAncora = await processAnchors(data.data);
    const metadata = await getMetadata(data.data, payload.urlToScrape);
    const response: ResponsePayload = {
      analisiParole,
      analisiLink: analisiAncora,
      metadata: metadata,
    };

    return response;
  }
}
