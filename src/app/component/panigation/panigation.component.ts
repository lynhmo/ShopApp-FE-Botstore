import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'panigation-component',
  templateUrl: './panigation.component.html',
  styleUrls: ['./panigation.component.scss']
})
export class PanigationComponent implements OnChanges {
  @Input() firstPage!: number;
  @Input() lastPage!: number;
  @Output() currentPageChange = new EventEmitter<number>();



  currentPage: number = 1;
  pagesToShow: number[] = [];

  ngOnChanges(): void {
    this.updatePagesToShow();
  }

  updatePagesToShow(): void {
    this.pagesToShow = [];
    if (this.currentPage === this.firstPage) {
      this.pagesToShow = [this.currentPage, this.currentPage + 1, this.currentPage + 2].filter(
        page => page <= this.lastPage
      );
    } else if (this.currentPage === this.lastPage) {
      this.pagesToShow = [this.currentPage - 2, this.currentPage - 1, this.currentPage].filter(
        page => page >= this.firstPage
      );
    } else {
      this.pagesToShow = [this.currentPage - 1, this.currentPage, this.currentPage + 1].filter(
        page => page >= this.firstPage && page <= this.lastPage
      );
    }
  }

  goToPage(page: number): void {
    if (page >= this.firstPage && page <= this.lastPage) {
      this.currentPage = page;
      this.updatePagesToShow();
      this.currentPageChange.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > this.firstPage) {
      this.goToPage(this.currentPage - 1);
    }
  }


  goToLast(): void {
    this.goToPage(this.lastPage);
  }

  goToFirst(): void {
    this.goToPage(this.firstPage);
  }

}
