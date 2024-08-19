import { Body, Controller, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { payloadDTO } from 'src/utils/customTypes';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post()
  async scrap(@Body() payload: payloadDTO): Promise<any> {
    return this.scraperService.scrap(payload);
  }
}
