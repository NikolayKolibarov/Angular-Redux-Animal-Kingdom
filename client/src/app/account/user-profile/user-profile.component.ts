import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { AnimalsActions } from '../../store/animals';
import { IAppState } from '../../store/IAppState';

import { Animal } from '../../animals/Animal';

@Component({
  selector: 'ak-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  animals: Array<Animal>

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions
  ) {
  }

  ngOnInit() {
    this.animalsActions.fetchUserAnimals();

    this.ngRedux
      .select('animals')
      .subscribe(animals => {
        this.animals = animals['currentUserAnimals'];
      });

  }

  remove(animalId): void {
    this.animalsActions.removeAnimal(animalId);
  }

}
