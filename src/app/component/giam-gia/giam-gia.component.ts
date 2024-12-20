import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-giam-gia',
  templateUrl: './giam-gia.component.html',
  styleUrls: ['./giam-gia.component.scss']
})
export class GiamGiaComponent implements OnChanges {
  @Input() totalMoney!: number;

  // Stage tracking
  isStage1Done: boolean = false
  isStage2Done: boolean = false
  isStage3Done: boolean = false
  shippedCost: number = 0
  currentStage: number = 1

  ngOnChanges(): void {
    this.updateStages()
  }

  private updateStages(): void {
    if (this.totalMoney < 200000 && this.totalMoney > 0) {
      this.shippedCost = 20000
      this.setStages(true, false, false, 1);
    } else if (this.totalMoney >= 200000 && this.totalMoney <= 500000) {
      this.shippedCost = 10000
      this.setStages(true, true, false, 2);
    } else if (this.totalMoney > 500000) {
      this.shippedCost = 0
      this.setStages(true, true, true, 3);
    }
  }

  private setStages(stage1: boolean, stage2: boolean, stage3: boolean, stage: number): void {
    this.isStage1Done = stage1;
    this.isStage2Done = stage2;
    this.isStage3Done = stage3;
    this.currentStage = stage;
  }







  // @Input() totalMoney!: number
  // stage: number = 1

  // stage1: boolean = false
  // stage2: boolean = false
  // stage3: boolean = false

  // isStage1Done: boolean = false
  // isStage2Done: boolean = false
  // isStage3Done: boolean = false

  // ngOnChanges(): void {
  // }

  // ngOnInit(): void {

  // }


  // reload(){
  //   if (this.totalMoney < 200000) {
  //     this.isStage1Done = true;
  //     this.isStage2Done = false;
  //     this.isStage3Done = false;
  //     this.stage1 = false;
  //     this.stage2 = true;
  //     this.stage3 = false;
  //   } else if (this.totalMoney >= 200000 && this.totalMoney <= 500000) {
  //     this.isStage1Done = true;
  //     this.isStage2Done = true;
  //     this.isStage3Done = false;
  //     this.stage1 = false;
  //     this.stage2 = false;
  //     this.stage3 = true;
  //   } else if (this.totalMoney > 500000) {
  //     this.isStage1Done = true;
  //     this.isStage2Done = true;
  //     this.isStage3Done = true;
  //     this.stage1 = true;
  //     this.stage2 = true;
  //     this.stage3 = true;
  //   }
  // }
}
