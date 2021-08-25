import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-rat',
  templateUrl: './rat.component.html',
  styleUrls: ['./rat.component.css'],
})
export class RatComponent implements OnDestroy, OnInit {
  @Output() dying = new EventEmitter<void>();
  @Output() respawn = new EventEmitter<void>();
  @Output() hoveredWithoutTool = new EventEmitter<void>();

  @Input() resetSubject: Subject<void> | undefined;
  @Input() hasTool: boolean | undefined;

  dead = false;
  ratSymbol = this.getRatSymbol();
  private respawnSubscription: Subscription | undefined;

  ngOnInit() {
    this.resetSubject?.subscribe(() => {
      this.respawnSubscription?.unsubscribe();
      this.dead = false;
    });
  }

  private getRatSymbol() {
    return Math.random() > 0.5 ? '🐁' : '🐀';
  }

  onHover() {
    if (!this.hasTool) {
      this.hoveredWithoutTool.emit();
    }

    if (this.dead || !this.hasTool) {
      return;
    }

    this.dead = true;
    this.dying.emit();

    this.respawnSubscription = timer(Math.random() * 30000 + 5000).subscribe(
      () => {
        this.ratSymbol = this.getRatSymbol();
        this.dead = false;
        this.respawn.emit();
      }
    );
  }

  ngOnDestroy() {
    this.respawnSubscription?.unsubscribe();
  }
}
