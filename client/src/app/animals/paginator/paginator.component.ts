import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ak-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() page: number;
  @Input() items: Array<any>;
  @Output() onPreviousPage: EventEmitter<any> = new EventEmitter();
  @Output() onNextPage: EventEmitter<any> = new EventEmitter();
  

  constructor() { }

  ngOnInit() {
  }

  hasPreviousPage(): boolean {
    return this.page > 1;
  }

  hasNextPage(): boolean {
    return this.items.length > 0;
  }

  previousPage(): void {
    this.onPreviousPage.emit();
  }

  nextPage(): void {
    this.onNextPage.emit();    
  }

}
