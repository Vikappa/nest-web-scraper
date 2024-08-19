import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperService {
  async scrap(): Promise<any> {
    return 'Hello World!';
  }
}
