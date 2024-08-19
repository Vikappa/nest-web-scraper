import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { payloadDTO } from 'src/utils/customTypes';

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

      const titoli = cheerioIstance('h1')
        .map((_, element) => cheerioIstance(element).text().trim()) //Indice dell'elemento indicato con l'underscore perchè non serve
        .get(); //Simile al .collect() di Java

      return {
        url: payload.urlToScrape,
        titoli,
      };
    } catch (error) {
      console.error('Error scraping:', error);
      throw new Error('Scraping failed');
    }
  }
}
