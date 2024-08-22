import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { payloadDTO, ResponsePayload } from 'src/utils/customTypes';
import {
  collectMedia,
  extractTextFromBody,
  processAnchors,
  processFileContent,
} from '../utils/functions';

@Injectable()
export class ScraperService {
  async scrap(payload: payloadDTO): Promise<ResponsePayload> {
    try {
      // Fai una richiesta GET alla URL specificata
      const { data } = await axios.get(payload.urlToScrape);
      // L'oggetto data contiene il contenuto HTML della pagina

      // Prende come input il payload della fetch e ritorna una stringa con il testo da analizzare
      const testo = extractTextFromBody(data);
      const analisiParole = processFileContent(await testo);
      const analisiAncora = await processAnchors(data);
      const collectedMedia = await collectMedia(data);
      const response: ResponsePayload = {
        analisiParole,
        analisiLink: analisiAncora,
        media: collectedMedia,
      };
      return response;
    } catch (error) {
      console.error('Error scraping:', error);
      throw new Error('Scraping failed');
    }
  }
}
