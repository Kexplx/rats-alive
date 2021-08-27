import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, timer } from 'rxjs';
import { HighscoreService } from '../highscore.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  currentRatCount = 0;
  gameOver = false;
  bounceButtonTimeout: Subscription | undefined;

  highscore = this.hs.getHighscore();

  hasTool = false;

  resetSubject = new Subject<void>();

  rats: null[] = [];

  get MAX_RATS_COUNT() {
    return this.rats.length;
  }

  constructor(private route: ActivatedRoute, private hs: HighscoreService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Default maxRatsCount if no query param exists in url.
      let maxRatsCount = 100;
      if ('rats' in params) {
        maxRatsCount = Number(params.rats);
      }

      this.setMaxRatCount(maxRatsCount);
    });
  }

  handleRatRespawn() {
    this.currentRatCount++;
  }

  handleContinueFromHighscore() {
    this.setMaxRatCount(this.highscore);
  }

  handleRatDeath() {
    this.currentRatCount--;

    if (this.currentRatCount === 0) {
      this.gameOver = true;
      this.handlePickupToolClick();
      this.hs.setHighscore(this.MAX_RATS_COUNT + 10);

      if (this.MAX_RATS_COUNT === 190) {
        // 200 RATS KILLED.
        this.toggleFireworks();
      }
    }
  }

  private toggleFireworks() {
    const fireworks = document.querySelector('.fireworks-container');
    fireworks?.classList.toggle('pyro');
  }

  handleRepeatClick() {
    // Increase current maximum by 10.
    const maxRatCount = this.MAX_RATS_COUNT + 10;

    this.setMaxRatCount(maxRatCount);

    if (this.MAX_RATS_COUNT === 190) {
      this.toggleFireworks();
    }
  }

  handleResetClick() {
    this.setMaxRatCount(this.MAX_RATS_COUNT);
  }

  handlePickupToolClick() {
    const body = document.querySelector('body');

    if (this.hasTool) {
      body?.classList.remove('tool');
    } else {
      body?.classList.add('tool');
    }

    this.hasTool = !this.hasTool;
  }

  setMaxRatCount(n: number): void {
    this.rats = [...new Array(n).fill(null)];
    this.currentRatCount = n;
    this.gameOver = false;

    this.resetSubject.next();
  }

  handleHoverWithoutTool() {
    this.bounceButtonTimeout?.unsubscribe();
    const toolBtn = document.querySelector('.btn-secondary');
    toolBtn?.classList.add('bounce');

    this.bounceButtonTimeout = timer(400).subscribe(() => toolBtn?.classList.remove('bounce'));
  }
}
