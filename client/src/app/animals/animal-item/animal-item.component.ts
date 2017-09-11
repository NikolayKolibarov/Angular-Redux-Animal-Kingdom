import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Animal } from '../Animal'

@Component({
  selector: 'ak-animal-item',
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.css']
})
export class AnimalItemComponent implements OnInit {
  @Input() animal: Animal;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }


  viewAnimalDetails(animalId): void {
    this.router.navigate(['/animals/details', animalId]);
  }

}
