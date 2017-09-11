import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard'

import { AnimalsComponent } from './animals/animals.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';

const routes: Routes = [
    { path: 'animals', component: AnimalsComponent },
    { path: 'animals/details/:id', component: AnimalDetailsComponent, canActivate: [AuthGuard] },
    { path: 'animals/create', component: CreateAnimalComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AnimalsRoutingModule { }