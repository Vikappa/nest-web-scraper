import {
  extractTextFromBody,
  processFileContent,
  splitWordsAndSpaces,
} from './functions';

let mockupHtmlFile: string;

beforeAll(async () => {
  const importedHtml = await import('./mockHtml');
  mockupHtmlFile = importedHtml.toString();
}); //Creo un istanza del mockup file prima di fare i test per evitare errori

describe('Test funzionamento funzione splitWordAndSpaces', () => {
  it('Controlla se separa spazi e parole correttamente', () => {
    const input = 'Ei UserBot!';
    const expectedOutput = ['Ei', ' ', 'UserBot', '!'];
    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });
  it('Controlla se i doppi spazi generano errori nella separazione di file e stringhe', () => {
    const input = 'Vincenzo   ha molte    idee, valutate di     assumerlo!';
    const expectedOutput = [
      'Vincenzo',
      ' ',
      'ha',
      ' ',
      'molte',
      ' ',
      'idee',
      ',',
      ' ',
      'valutate',
      ' ',
      'di',
      ' ',
      'assumerlo',
      '!',
    ];
    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });

  it('Se la stringa col contenuto del file è vuota splitWordsAndSpaces dovrebe tornare un array vuoto', () => {
    const input = '';
    const expectedOutput: string[] = [];
    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });

  it('Divide correttamente parole e parentesi', () => {
    const input = "Vincenzo ha pensato (un'altra) cosa";
    const expectedOutput = [
      'Vincenzo',
      ' ',
      'ha',
      ' ',
      'pensato',
      ' ',
      '(',
      "un'",
      'altra',
      ')',
      ' ',
      'cosa',
    ];

    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('Test funzionamento metodo processFileContent', () => {
  const parola1 = 'Ciao';
  const parola2 = 'sono';
  const parola3 = 'Vincenzo';
  const parola4 = 'assumetemi';

  let stringFileContent = '';

  const numeroParola1 = Math.floor(Math.random() * 100 + 1);
  const numeroParola2 = Math.floor(Math.random() * 100 + 1);
  const numeroParola3 = Math.floor(Math.random() * 100 + 1);
  const numeroParola4 = Math.floor(Math.random() * 100 + 1);

  for (let index = 0; index < numeroParola1; index++) {
    stringFileContent += parola1 + ' ';
  }

  for (let index = 0; index < numeroParola2; index++) {
    stringFileContent += parola2 + ' ';
  }

  for (let index = 0; index < numeroParola3; index++) {
    stringFileContent += parola3 + ' ';
  }

  for (let index = 0; index < numeroParola4; index++) {
    stringFileContent += parola4 + ' ';
  }

  // Crea una stringa contenente parole e spazi casuali con valori casuali registrati per fare i confronti con i test

  it('Controlla se il metodo che conta parole, caratteri e spazi calcola i risultati aspettati', () => {
    const { nSpazi, nParole, nCaratteri, parolePiuUsate } =
      processFileContent(stringFileContent);

    expect(nSpazi).toBe(
      numeroParola1 + numeroParola2 + numeroParola3 + numeroParola4,
    );

    expect(nParole).toBe(
      numeroParola1 + numeroParola2 + numeroParola3 + numeroParola4,
    );

    expect(nCaratteri).toBe(
      stringFileContent.trim().replace(/\s+/g, '').length,
    ); // Rimuove gli spazi e conta il numero di caratteri

    expect(parolePiuUsate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          getWord: expect.any(Function),
          getScore: expect.any(Function),
        }), // Controlla se il metodo ritorna un array di oggetti WordScore
      ]),
    );
  });
});

describe('Controllo funzionamento funzione extractTextFromBody', () => {
  it('Controlla se il mock html esiste ed è esportabile', () => {
    const htmlToBeTested = mockupHtmlFile;
    expect(htmlToBeTested).toBeDefined();
  });
  it('Controlla se extractTextFromBody estrae un testo senza tag html ne nomi di classi', async () => {
    let specialCharactersFound = false;
    const specialCharacters = [
      '{',
      '}',
      '_',
      '`',
      'className',
      'href',
      'src',
      'alt',
      'title', // Caratteri sgami dell'html che non dovrebbero essere visibili
    ];

    const testoPurificato = extractTextFromBody(mockupHtmlFile);

    for (let i = 0; i < (await testoPurificato).length; i++) {
      if (specialCharacters.includes(testoPurificato[i])) {
        specialCharactersFound = true;
        console.log(
          '---------------Trovato carattere speciale: ',
          testoPurificato[i],
        );
        break;
      }
    }
    expect(specialCharactersFound).toBe(false);
  });
});
