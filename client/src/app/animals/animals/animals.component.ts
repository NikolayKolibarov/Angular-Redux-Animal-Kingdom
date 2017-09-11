import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { AnimalsActions } from '../../store/animals';

import { Animal } from '../Animal';
import { IAppState } from '../../store/IAppState';


@Component({
  selector: 'ak-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  private animals: Array<Animal>
  private searchResults: Array<Animal>
  private page: number
  private search: string
  private showSearchResults: boolean

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions,
  ) {

    this.animals = [];
    this.searchResults = [];
    this.page = 1;
    this.search = '';
  }

  ngOnInit() {
    this.animalsActions.fetchAnimals();

    this.ngRedux
      .select('animals')
      .subscribe(animals => {
        this.animals = animals['all'];
      });

  }

  onSearchInputChange(searchStr: string) {
    this.search = searchStr;
    this.ngRedux
      .select('animals')
      .subscribe(animals => {
        this.searchResults = animals['searchResults'];
      });

    this.page = 1;
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;

      if (this.search != '') {
        this.animalsActions.searchAnimals(this.search, this.page)
      } else {
        this.animalsActions.fetchAnimals(this.page);
      }
    }

  }

  nextPage(): void {
    this.page++;

    if (this.search != '') {
      this.animalsActions.searchAnimals(this.search, this.page)
    } else {
      this.animalsActions.fetchAnimals(this.page);
    }

  }

}
