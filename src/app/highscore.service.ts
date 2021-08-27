import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighscoreService {
  private HIGHSCORE_KEY = 'rats-alive-hs';

  getHighscore(): number {
    const entry = localStorage.getItem(this.HIGHSCORE_KEY) || 0;

    return Number(entry);
  }

  setHighscore(highscore: number): void {
    localStorage.setItem(this.HIGHSCORE_KEY, highscore.toString());
  }
}
