import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../layouts/material.module'
import { AnimalsRoutingModule } from './animals-routing.module'

import { AnimalService } from '../shared/services/animal.service';

import { AnimalsActions } from '../store/animals';

import { AnimalsComponent } from './animals/animals.component';
import { AnimalSearchComponent } from './animal-search/animal-search.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { AnimalItemComponent } from './animal-item/animal-item.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AnimalsRoutingModule,
        
    ],
    providers: [AnimalService, AnimalsActions],
    declarations: [
        AnimalsComponent,
        AnimalSearchComponent,
        AnimalDetailsComponent,
        CreateCommentComponent,
        CreateAnimalComponent,
        AnimalListComponent,
        AnimalItemComponent,
        CommentListComponent,
        PaginatorComponent
    ],
    exports: [
        AnimalListComponent,
        AnimalItemComponent
    ]
})

export class AnimalsModule { }