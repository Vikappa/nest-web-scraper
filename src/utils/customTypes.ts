import { WordScore } from './WordScore';

export interface payloadDTO {
  urlToScrape: string;
}

export interface metadata {
  icon: string;
  title: string;
  description: string;
  preveiwImage: string;
  baseUrl: string;
}

export interface AnchorsAnalys {
  elencoLinkInterni: WordScore[];
  elencoLinkEsterni: WordScore[];
}

export interface TextAnalysis {
  nSpazi: number;
  nParole: number;
  nCaratteri: number;
  nSegniPunteggiatura: number;
  segniPunteggiaturaTrovati: WordScore[];
  parolePiuUsate: WordScore[];
}

export interface mediaCollection {
  images: string[];
}

export interface ResponsePayload {
  analisiParole: TextAnalysis;
  analisiLink: AnchorsAnalys;
  metadata: metadata;
}

export interface PlaylistDiVincenzoResponse {
  playlistDiVincenzo: string[];
}
