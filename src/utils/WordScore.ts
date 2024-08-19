export class WordScore {
  word: string;
  score: number;
  constructor(word: string, score: number) {
    this.word = word;
    this.score = score;
  }

  public getWord(): string {
    return this.word;
  }

  public getScore(): number {
    return this.score;
  }

  public increaseScore(): void {
    this.score++;
  }
}
