import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScarperController } from './scarper/scarper.controller';
import { ScraperController } from './scraper/scraper.controller';

@Module({
  imports: [],
  controllers: [AppController, ScarperController, ScraperController],
  providers: [AppService],
})
export class AppModule {}
