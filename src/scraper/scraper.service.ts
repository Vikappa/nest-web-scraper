import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { payloadDTO } from 'src/utils/customTypes';
import { extractTextFromBody, processFileContent } from '../utils/functions';

@Injectable()
export class ScraperService {
  async scrap(payload: payloadDTO): Promise<any> {
    try {
      // Fai una richiesta GET alla URL specificata
      const { data } = await axios.get(payload.urlToScrape);
      // L'oggetto data contiene il contenuto HTML della pagina

      // Prende come input il payload della fetch e ritorna una stringa con il testo da analizzare
      const testo = extractTextFromBody(data);

      //processFileContent è la funzione che ritorna un oggetto con i risultati richiesti
      return processFileContent(await testo); //Prende come input una lunga stringa e ritorna un oggetto con i risultati richiesti
    } catch (error) {
      console.error('Error scraping:', error);
      throw new Error('Scraping failed');
    }
  }
}
