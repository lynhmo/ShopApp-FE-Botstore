import { Component } from '@angular/core';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {
  numberValue: number = 0;

  increment(): void {
    this.numberValue++;
  }

  decrement(): void {
    if (this.numberValue > 0) {
      this.numberValue--;
    }
  }
}
