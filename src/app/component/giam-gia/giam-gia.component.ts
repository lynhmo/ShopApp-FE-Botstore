import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-giam-gia',
  templateUrl: './giam-gia.component.html',
  styleUrls: ['./giam-gia.component.scss']
})
export class GiamGiaComponent implements OnChanges, OnInit{
  @Input() totalMoney: number = 200000
  stage: number = 1

  stage1: boolean = false
  stage2: boolean = false
  stage3: boolean = false

  isStage1Done: boolean = false
  isStage2Done: boolean = false
  isStage3Done: boolean = false

  ngOnChanges(): void {
    // if (this.totalMoney < 200000) {
    //   // this.isStage1Done = false;
    //   // this.isStage2Done = false;
    //   // this.isStage3Done = false;
    //   this.stage1 = true;
    //   this.stage2 = false;
    //   this.stage3 = false;
    // } else if (this.totalMoney >= 200000 && this.totalMoney < 500000) {
    //   // this.isStage1Done = true;
    //   // this.isStage2Done = false;
    //   // this.isStage3Done = false;
    //   this.stage1 = true;
    //   this.stage2 = true;
    //   this.stage3 = false;
    // } else {

    // }
  }

  ngOnInit(): void{
    if (this.totalMoney < 200000) {
      this.isStage1Done = true;
      this.isStage2Done = false;
      this.isStage3Done = false;
      this.stage1 = false;
      this.stage2 = true;
      this.stage3 = false;
    } else if (this.totalMoney >= 200000 && this.totalMoney <= 500000) {
      this.isStage1Done = true;
      this.isStage2Done = true;
      this.isStage3Done = false;
      this.stage1 = false;
      this.stage2 = false;
      this.stage3 = true;
    } else if (this.totalMoney > 500000) {
      this.isStage1Done = true;
      this.isStage2Done = true;
      this.isStage3Done = true;
      this.stage1 = true;
      this.stage2 = true;
      this.stage3 = true;
    }
  }
}
