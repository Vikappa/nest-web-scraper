import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';
import { LoggingService } from './logging/logging.service';

@Module({
  imports: [ScraperModule],
  controllers: [AppController],
  providers: [AppService, LoggingService],
})
export class AppModule {}
