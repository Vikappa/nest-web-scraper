import { Injectable } from '@nestjs/common';
import { payloadDTO } from 'src/utils/customTypes';

@Injectable()
export class ScraperService {
  async scrap(payload: payloadDTO): Promise<any> {
    return payload.urlToScrape;
  }
}
