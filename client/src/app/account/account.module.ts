import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnimalsActions } from '../store/animals';

import { MaterialModule } from '../layouts/material.module'
import { AccountRoutingModule } from './account-routing.module'
import { AnimalsModule } from '../animals/animals.module'

import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AccountRoutingModule,
        AnimalsModule
    ],
    providers: [AnimalsActions],
    declarations: [
        UserProfileComponent,
    ],
    exports: [
    ]
})

export class AccountModule { }