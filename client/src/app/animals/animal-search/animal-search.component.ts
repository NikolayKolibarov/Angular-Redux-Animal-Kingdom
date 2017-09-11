import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { AnimalsActions } from '../../store/animals';
import { IAppState } from '../../store/IAppState';

@Component({
  selector: 'ak-animal-search',
  templateUrl: './animal-search.component.html',
  styleUrls: ['./animal-search.component.css']
})
export class AnimalSearchComponent implements OnInit {

  @Input() page
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions,
  ) { }

  ngOnInit() {
  }

  searchAnimals(searchStr): void {
    this.animalsActions.searchAnimals(searchStr, this.page);

    this.onSearch.emit(searchStr);
  }

}
