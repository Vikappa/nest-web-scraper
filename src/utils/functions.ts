import { AnchorsAnalys, metadata, TextAnalysis } from './customTypes';
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
  let imageDescriptions = '';
  cheerioIstance('img').each((index, element) => {
    const altText = cheerioIstance(element).attr('alt');
    if (altText) {
      imageDescriptions += altText;
    }
  });
  //console.log('titles', titles.text());
  // console.log('texts', texts.text());
  // console.log('imageDescriptions', imageDescriptions);
  const text = titles.text() + texts.text() + imageDescriptions;

  return text;
};

export const processAnchors = async (data: string): Promise<AnchorsAnalys> => {
  const elencoLinkEsterni: WordScore[] = [];
  const elencoLinkInterni: WordScore[] = [];
  const cheerioIstance = cheerio.load(data);
  const links: string[] = [];

  cheerioIstance('a').each((_, element) => {
    const href = cheerioIstance(element).attr('href');
    if (href) {
      links.push(href);
    }
  });

  for (const link of links) {
    if (link.startsWith(`http`)) {
      const existing = elencoLinkEsterni.find(
        (linkAnalysed) => linkAnalysed.getWord() === link,
      );
      if (existing) {
        existing.increaseScore();
      } else {
        elencoLinkEsterni.push(new WordScore(link, 1));
      }
    } else {
      const existing = elencoLinkInterni.find(
        (linkAnalysed) => linkAnalysed.getWord() === link,
      );
      if (existing) {
        existing.increaseScore();
      } else {
        elencoLinkInterni.push(new WordScore(link, 1));
      }
    }
  }
  return { elencoLinkEsterni, elencoLinkInterni };
};

export const getMetadata = async (
  data: string,
  url: string,
): Promise<metadata> => {
  const cheerioIstance = cheerio.load(data);
  const title = cheerioIstance('title').text();
  const description = cheerioIstance('meta[name="description"]').attr(
    'content',
  );
  const preveiwImage = cheerioIstance('meta[property="og:image"]').attr(
    'content',
  );

  let baseUrl = cheerioIstance('base').attr('href');

  // Fallback all'URL di origine se <base> non è presente
  if (!baseUrl) {
    baseUrl = new URL(url).origin;
  }

  let icon = cheerioIstance('link[rel="icon"]').attr('href');

  if (!icon.startsWith('http')) {
    icon = baseUrl + cheerioIstance('link[rel="icon"]').attr('href');
  }

  return { icon, title, description, preveiwImage, baseUrl };
};

export const checkUrlMalformed = (url: string): boolean => {
  if (
    !(url.startsWith('http://') || url.startsWith('https://')) ||
    !/^[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}$/.test(new URL(url).hostname)
  ) {
    return true;
  } else {
    return false;
  }
};
