import { WordScore } from './WordScore';

export interface payloadDTO {
  urlToScrape: string;
}

export interface AnchorsAnalys {
  nLink: number;
  nLinkInterni: number;
  nLinkEsterni: number;
  elencoLink: WordScore[];
}

export interface TextAnalysis {
  nSpazi: number;
  nParole: number;
  nCaratteri: number;
  nSegniPunteggiatura: number;
  segniPunteggiaturaTrovati: WordScore[];
  parolePiuUsate: WordScore[];
}

export interface ResponsePayload {
  analisiParole: TextAnalysis;
  analisiLink: AnchorsAnalys;
}

export interface PlaylistDiVincenzoResponse {
  playlistDiVincenzo: string[];
}
