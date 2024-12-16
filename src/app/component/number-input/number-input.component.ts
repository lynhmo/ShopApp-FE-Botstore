import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {
  @Output() inputValue = new EventEmitter<number>();

  numberValue: number = 0;

  sendData() {
    this.inputValue.emit(this.numberValue); // Emit the data
  }

  increment(): void {
    this.numberValue++;
    this.sendData()
  }

  decrement(): void {
    if (this.numberValue > 0) {
      this.numberValue--;
    }
    this.sendData()
  }
}
