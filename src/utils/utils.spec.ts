import { splitWordsAndSpaces } from './functions';

describe('Test funzionamento funzione splitWordAndSpaces', () => {
  it('Controlla se separa spazi e parole correttamente', () => {
    const input = 'Ciao mondo!';
    const expectedOutput = ['Ciao', ' ', 'mondo!'];
    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });
});
