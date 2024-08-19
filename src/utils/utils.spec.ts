import { processFileContent, splitWordsAndSpaces } from './functions';

describe('Test funzionamento funzione splitWordAndSpaces', () => {
  it('Controlla se separa spazi e parole correttamente', () => {
    const input = 'Ciao mondo!';
    const expectedOutput = ['Ciao', ' ', 'mondo!'];
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
