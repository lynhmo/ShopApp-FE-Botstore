import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {
  @Output() inputValue = new EventEmitter<number>();

  @Input() numberValue!: number



  ngOnInit(): void {
    if (this.numberValue == null) {
      this.numberValue = 1
    }
  }
  // numberValue: number = 0;


  disableOnZero():boolean {
    return this.numberValue == 1 ? true : false
  }

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
