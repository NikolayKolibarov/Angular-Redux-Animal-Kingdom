import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../store/IAppState';
import { AnimalsActions } from '../../store/animals';

import { Animal } from '../Animal'

@Component({
  selector: 'ak-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.css']
})

export class CreateAnimalComponent implements OnInit {
  constructor(
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions
  ) {
  }

  ngOnInit() {

  }

  create(name, age, color, type, price, image, breed): void {
   this.animalsActions.createAnimal({name, age, color, type, price, image, breed});
  }

}
