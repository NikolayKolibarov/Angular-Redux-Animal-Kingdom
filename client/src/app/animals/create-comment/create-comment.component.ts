import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../store/IAppState';
import { AnimalsActions } from '../../store/animals';

import { Animal } from '../Animal'

@Component({
  selector: 'ak-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})

export class CreateCommentComponent implements OnInit {
  @Input() animalId: string

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private animalsActions: AnimalsActions
  ) {
  }

  ngOnInit() {

  }

  addComment(message): void {
    this.animalsActions
      .addAnimalComment(this.animalId, { message });
  }

}
