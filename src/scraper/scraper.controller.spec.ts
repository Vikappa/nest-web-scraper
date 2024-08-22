import { Test, TestingModule } from '@nestjs/testing';
import { ScraperController } from './scraper.controller';
import { ScraperModule } from './scraper.module';
import { mockHtml } from '../utils/mockHtml';
import * as cheerio from 'cheerio';

describe('ScraperController', () => {
  let controller: ScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScraperModule], // Importa il modulo ScraperModule
    }).compile();

    controller = module.get<ScraperController>(ScraperController);
  });

  it('Il modulo scraper esiste ed è definito', () => {
    expect(controller).toBeDefined();
  });
});

describe('La libreria cheerio estrae i testi senza elementi inquinanti', () => {
  const htmlToTestOn = mockHtml;
  const cheerioIstance = cheerio.load(htmlToTestOn);
  let specialCharactersFound = false;
  const specialCharacters = ['!', '#', '$', '%', '^', '&', '*'];
  const testo = cheerioIstance('body').text();
  for (let i = 0; i < testo.length; i++) {
    if (specialCharacters.includes(testo[i])) {
      specialCharactersFound = true;
      console.log('---------------Trovato carattere speciale: ', testo[i]);
      break;
    }
  }
  expect(specialCharactersFound).toBe(false);
});
