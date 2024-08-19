import { ResponsePayload } from './customTypes';
import { WordScore } from './WordScore';

const REGEX = /\S+|\s+/g;

// Calcola i risultati richiesti nella consegna
export const processFileContent = (data: string): ResponsePayload => {
  const wordsAndSpaces = splitWordsAndSpaces(data); // Ritorna un array di elementi filtrati, ogni elemento è una parola o uno spazio

  let nSpazi: number = 0;
  let nParole: number = 0;
  let nCaratteri: number = 0;
  const parolePiuUsate: WordScore[] = [];

  for (const singleWordOrSpace of wordsAndSpaces) {
    if (singleWordOrSpace.trim() === '') {
      nSpazi++;
    } else {
      const trimmedWord = singleWordOrSpace.trim();
      const existing = parolePiuUsate.find(
        (parolaConteggiata) => parolaConteggiata.getWord() === trimmedWord,
      );

      if (existing) {
        existing.increaseScore();
      } else {
        parolePiuUsate.push(new WordScore(trimmedWord, 1));
      }
      nParole++;
      nCaratteri += singleWordOrSpace.length;
    }
  }

  parolePiuUsate.sort((a, b) => b.getScore() - a.getScore());

  return { nSpazi, nParole, nCaratteri, parolePiuUsate };
};

// Metodo che usa le regex per filtrare il contenuto del file e trasforma gli spazi lunghi in spazi di un solo carattere
export const splitWordsAndSpaces = (data: string): string[] => {
  return (data.match(REGEX) || []).map((part: string) => {
    if (/\s+/.test(part)) {
      return ' ';
    }
    return part;
  });
};
