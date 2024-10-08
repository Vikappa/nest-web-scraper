import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperService } from './scraper/scraper.service';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;
  let appMainModule: AppModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

    const mainApp: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appMainModule = mainApp.get<AppModule>(AppModule);
  });

  describe('root', () => {
    it('Il modulo principale è definito', () => {
      expect(appMainModule).toBeTruthy();
    });

    it('Il modulo principale è del tipo corretto', () => {
      expect(appMainModule).toBeInstanceOf(AppModule);
    });

    it('Il metodo getHello() è definito', () => {
      expect(appController.getHello()).toBeTruthy();
    });

    describe('PlaylistDiVincenzoResponse', () => {
      const playlistDiVincenzo: string[] = [
        'https://www.youtube.com/watch?v=6XJkPtxqWM8',
        'https://www.youtube.com/watch?v=2YllipGl2Is',
        'https://www.youtube.com/watch?v=w7yG1P2Nq_w',
        'https://www.youtube.com/watch?v=FglU0X-Vyrw',
        'https://www.youtube.com/watch?v=Cq56o0YH3mE',
        'https://www.youtube.com/watch?v=MM0kvuITNx8',
        'https://www.youtube.com/watch?v=RUJ75jeTQ1A',
        'https://www.youtube.com/watch?v=i3Jv9fNPjgk',
        'https://www.youtube.com/watch?v=QYueeJHSHSo',
        'E in genere ogni due ore mi faccio pure una pausa!',
      ];

      it('Hello world ritorna la playlist di Vincenzo', () => {
        expect(appController.getHello()).toEqual({ playlistDiVincenzo });
      });
    });
  });

  describe('Provo i servizi di scraping', () => {
    let service: ScraperService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ScraperService],
      }).compile();
      service = module.get<ScraperService>(ScraperService);
    });

    it('Servizio creato', () => {
      expect(service).toBeDefined();
    });
  });

  it('Il controller dell hello world viene importato correttamente', () => {
    expect(appController).toBeDefined();
  });
});
