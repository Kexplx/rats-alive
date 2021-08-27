import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighscoreService {
  getHighscore(): number {
    const entry = localStorage.getItem('hs') || 0;

    return Number(entry);
  }

  setHighscore(highscore: number): void {
    localStorage.setItem('hs', highscore.toString());
  }
}
