import { WordScore } from './WordScore';

export interface payloadDTO {
  urlToScrape: string;
}

export interface ResponsePayload {
  nSpazi: number;
  nParole: number;
  nCaratteri: number;
  parolePiuUsate: WordScore[];
}
