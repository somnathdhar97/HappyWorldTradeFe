import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.scss']
})
export class CountCardComponent {
  @Input() investment: any; // Assuming each investment has an 'id' property
  @Input() isSelected: boolean = false;
  @Output() cardClicked = new EventEmitter<number>();

  onCardClick() {
    this.cardClicked.emit(this.investment.id);
  }
}
