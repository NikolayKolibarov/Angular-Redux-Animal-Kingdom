import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgRedux, select } from '@angular-redux/store';
import 'rxjs/add/operator/switchMap';

import { AnimalsActions } from '../../store/animals';

import { Animal } from '../Animal'
import { IAppState } from '../../store/IAppState';


@Component({
  selector: 'ak-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  @Input() animal: Animal;
  animalComments: Array<object>

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions,
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.animalsActions
          .fetchAnimal(params['id']);

        this.animalsActions
          .fetchAnimalComments(params['id']);

        this.ngRedux
          .select('animals')
          .subscribe(animals => {
            this.animal = animals['selected'];
          });

        this.ngRedux
          .select('animals')
          .subscribe(animals => {
            this.animalComments = animals['selectedAnimalComments'];
          });
      });
  }

  addReaction(animalId, reaction: string): void {
    this.animalsActions
      .addAnimalReaction(animalId, reaction);
  }

  back(): void {
    this.location.back();
  }

}
