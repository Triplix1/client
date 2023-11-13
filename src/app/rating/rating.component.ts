import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() max: number = 5;
  @Input() currentRate: number = 0;
  @Output() rate: EventEmitter<number> = new EventEmitter<number>();
  isHovered = false;
  currentPosition: number = 0;

  set Rate(rate: number) {
    this.currentRate = rate;
    this.rate.emit(rate);
  }

  get Rate() {
    return this.currentRate;
  }

  get maxArray() {
    return Array(this.max).fill(0);
  }

  onMouseEnter(index: number): void {
    this.isHovered = true;
    this.currentPosition = index + 1; // Add 1 because the index is zero-based
  }

  onMouseLeave(): void {
    this.isHovered = false;
    // Reset to the actual selected rate when not hovering
    this.currentPosition = 0;
  }
}
