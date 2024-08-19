import { Test, TestingModule } from '@nestjs/testing';
import { ScraperController } from './scraper.controller';
import { ScraperModule } from './scraper.module';
describe('ScraperController', () => {
  let controller: ScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScraperModule], // Importa il modulo ScraperModule
    }).compile();

    controller = module.get<ScraperController>(ScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
