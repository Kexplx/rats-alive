import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  currentRatCount = 0;
  gameOver = false;
  bounceButtonTimeout: Subscription | undefined;

  hasTool = false;

  resetSubject = new Subject<void>();

  rats: null[] = [];

  constructor(private route: ActivatedRoute) {}

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

  handleRatDeath() {
    this.currentRatCount--;

    if (this.currentRatCount === 0) {
      this.gameOver = true;
      this.handlePickupToolClick();
    }
  }

  handleRepeatClick() {
    // Increase current maximum by 10.
    const maxRatCount = this.rats.length + 10;

    this.setMaxRatCount(maxRatCount);
  }

  handleSettingsClick() {
    try {
      const promptInput = prompt('Rat Count:', '50');

      if (!promptInput) {
        return;
      }

      const maxRatCount = Number(promptInput);

      this.setMaxRatCount(maxRatCount);
    } catch (error) {}
  }

  handleResetClick() {
    this.setMaxRatCount(this.rats.length);
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
