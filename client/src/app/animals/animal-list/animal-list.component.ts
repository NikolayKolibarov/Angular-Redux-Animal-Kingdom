import { Component, Input, OnInit } from '@angular/core';

import { Animal } from '../Animal'


@Component({
  selector: 'ak-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
  @Input() animals: Array<Animal>;

  constructor() {
  }

  ngOnInit() {
  }

}
