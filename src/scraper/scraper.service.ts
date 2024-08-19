import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { payloadDTO } from 'src/utils/customTypes';
import { processFileContent } from '../utils/functions';

@Injectable()
export class ScraperService {
  async scrap(payload: payloadDTO): Promise<any> {
    try {
      // Fai una richiesta GET alla URL specificata
      const { data } = await axios.get(payload.urlToScrape);
      // L'oggetto data contiene il contenuto HTML della pagina
      console.log(data);

      // Carica il contenuto HTML nel parser di cheerio
      const cheerioIstance = cheerio.load(data);

      //estrae tutti i testi dal body
      const testo = cheerioIstance('body').text();

      //processFileContent è la funzione che ritorna un oggetto con i risultati richiesti
      return processFileContent(testo);
    } catch (error) {
      console.error('Error scraping:', error);
      throw new Error('Scraping failed');
    }
  }
}
