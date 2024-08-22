import { AnchorsAnalys, TextAnalysis } from './customTypes';
import { WordScore } from './WordScore';
import * as cheerio from 'cheerio';

const REGEX = /\w+['’]?\w*|\d+[.,!?]?|[.,!?()]|\s+/g;

// Calcola i risultati richiesti nella consegna
export const processFileContent = (data: string): TextAnalysis => {
  const wordsAndSpaces = splitWordsAndSpaces(data); // Ritorna un array di elementi filtrati, ogni elemento è una parola o uno spazio

  let nSpazi: number = 0;
  let nParole: number = 0;
  let nCaratteri: number = 0;
  let nSegniPunteggiatura: number = 0;
  const parolePiuUsate: WordScore[] = []; //Corretto nome variabile :-)
  const segniPunteggiaturaTrovati: WordScore[] = [];
  const segniPunteggiatura = ['.', ',', ')', '(', "'", ':', ';', '!', '?', '#'];

  for (const singleWordOrSpace of wordsAndSpaces) {
    if (singleWordOrSpace.trim() === '') {
      nSpazi++;
    } else {
      const trimmedWord = singleWordOrSpace.trim();

      if (segniPunteggiatura.includes(trimmedWord)) {
        nSegniPunteggiatura++;
        const previousSegnodiPunteggiatura = segniPunteggiaturaTrovati.find(
          (segnoPunteggiatura) => segnoPunteggiatura.getWord() === trimmedWord,
        );
        if (previousSegnodiPunteggiatura) {
          previousSegnodiPunteggiatura.increaseScore();
        } else {
          segniPunteggiaturaTrovati.push(new WordScore(trimmedWord, 1));
        }
      } else {
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
  }

  parolePiuUsate.sort((a, b) => b.getScore() - a.getScore());

  return {
    nSpazi,
    nParole,
    nCaratteri,
    nSegniPunteggiatura,
    segniPunteggiaturaTrovati,
    parolePiuUsate,
  };
};

// Metodo che usa le regex per filtrare il contenuto del file e trasforma gli spazi lunghi in spazi di un solo carattere
export const splitWordsAndSpaces = (data: string): string[] => {
  return (data.match(REGEX) || []).flatMap((part: string) => {
    if (/\s+/.test(part)) {
      return ' ';
    }

    // Gestire la separazione delle parole unite da apostrofi
    if (part.includes("'") || part.includes("'")) {
      const splitParts = part.split(/(?<=[''])/); // separa dopo l'apostrofo
      return splitParts;
    }

    return part;
  });
};

//Funzione che usa Cheerio per estrarre il testo dal body
export const extractTextFromBody = async (data: string): Promise<string> => {
  // Carica il contenuto HTML nel parser di cheerio
  const cheerioIstance = cheerio.load(data);

  // Seleziona il contenuto di specifici tag invece di prendere l'intero body
  const titles = cheerioIstance('h1, h2, h3, h4, h5, h6');
  const texts = cheerioIstance('p, li, span, a');
  const imageDescriptions = cheerioIstance('img').find('alt');
  //console.log('titles', titles.text());
  // console.log('texts', texts.text());
  // console.log('imageDescriptions', imageDescriptions.text());
  const text = titles.text() + texts.text() + imageDescriptions.text();

  return text;
};

export const processAnchors = async (data: string): Promise<AnchorsAnalys> => {
  const nLink: number = 0;
  const nLinkInterni: number = 0;
  const nLinkEsterni: number = 0;
  const elencoLink: WordScore[] = [];
  const cheerioIstance = cheerio.load(data);
  const links = cheerioIstance('a');
  for (const link of links) {
    const href = link.attribs.href;
    const existing = elencoLink.find(
      (linkAnalysed) => linkAnalysed.getWord() === href,
    );
    if (existing) {
      existing.increaseScore();
    } else {
      elencoLink.push(new WordScore(href, 1));
    }
  }
  return { nLink, nLinkInterni, nLinkEsterni, elencoLink };
};
