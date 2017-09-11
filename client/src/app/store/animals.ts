import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from './IAppState';
import { IAction } from './IAction';

import { AnimalService } from '../shared/services/animal.service';
import { MessageService } from '../shared/services/message.service';

import { Animal } from '../animals/Animal';

// Action
@Injectable()
export class AnimalsActions {
    constructor(
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private animalService: AnimalService,
        private messageService: MessageService,
    ) { }

    static FETCH_ANIMALS: string = 'FETCH_ANIMALS';
    static FETCH_ANIMAL: string = 'FETCH_ANIMAL';
    static FETCH_ANIMAL_COMMENTS: string = 'FETCH_ANIMAL_COMMENTS';
    static FETCH_USER_ANIMALS: string = 'FETCH_USER_ANIMALS';
    static CREATE_ANIMAL: string = 'CREATE_ANIMAL';
    static REMOVE_ANIMAL: string = 'REMOVE_ANIMAL';
    static SEARCH_ANIMALS: string = 'SEARCH_ANIMALS';
    static ANIMAL_CREATE_COMMENT: string = 'ANIMAL_CREATE_COMMENT';
    static ANIMAL_ADD_REACTION: string = 'ANIMAL_ADD_REACTION';
    static ANIMALS_ERROR: string = 'ANIMALS_ERROR';

    fetchAnimals(page = 1): void {
        this.animalService
            .getAnimals(page)
            .then(animals => {
                this.ngRedux.dispatch({ type: AnimalsActions.FETCH_ANIMALS, payload: { animals: animals } });
            });
    }

    fetchAnimal(animalId): void {
        this.animalService
            .getAnimal(animalId)
            .then(animal => {
                this.ngRedux.dispatch({ type: AnimalsActions.FETCH_ANIMAL, payload: { animal: animal } });
            })
    }

    fetchAnimalComments(animalId): void {
        this.animalService
            .getAnimalComments(animalId)
            .subscribe(response => {
                this.ngRedux.dispatch({ type: AnimalsActions.FETCH_ANIMAL_COMMENTS, payload: { comments: response.json() } });
            })
    }

    createAnimal(animal): void {
        this.animalService
            .create(animal)
            .subscribe(response => {
                let data = response.json();

                if (data.success) {
                    this.ngRedux.dispatch({ type: AnimalsActions.CREATE_ANIMAL });
                    this.messageService.showSuccessMessage(data.message);
                    this.router.navigate(['/animals']);
                } else {
                    if (data.errors.name) {
                        this.animalsError(data.errors.name);
                    } else if (data.errors.age) {
                        this.animalsError(data.errors.age);
                    } else if (data.errors.color) {
                        this.animalsError(data.errors.color);
                    } else if (data.errors.type) {
                        this.animalsError(data.errors.type);
                    } else if (data.errors.price) {
                        this.animalsError(data.errors.price);
                    } else if (data.errors.image) {
                        this.animalsError(data.errors.image);
                    }
                }
            })
    }

    removeAnimal(animalId) {
        this.animalService
            .delete(animalId)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: AnimalsActions.REMOVE_ANIMAL });
                    this.messageService.showSuccessMessage(response.json().message);
                    this.fetchUserAnimals();
                } else {
                    this.messageService.showErrorMessage(response.json().message);
                }
            })
    }

    searchAnimals(searchStr, page) {
        this.animalService
            .search(searchStr, page)
            .then(animals => {
                this.ngRedux.dispatch({ type: AnimalsActions.SEARCH_ANIMALS, payload: { animals: animals } });
            });
    }

    addAnimalComment(animalId, comment) {
        if (comment.message !== undefined && comment.message !== "") {
            console.log(comment)
            this.animalService
                .addComment(animalId, comment)
                .subscribe(response => {
                    if (response.json().success) {
                        this.ngRedux.dispatch({ type: AnimalsActions.ANIMAL_CREATE_COMMENT, payload: { comment: response.json().comment } });
                        this.fetchAnimalComments(animalId);
                        this.messageService.showSuccessMessage('Comment was added successfully.');
                    } else {
                        this.animalsError(response.json().message);
                    }
                });
        } else {
            this.animalsError('You must enter a comment.');
        }

    }

    addAnimalReaction(animalId, reaction) {
        this.animalService
            .addReaction(animalId, reaction)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: AnimalsActions.ANIMAL_ADD_REACTION, payload: reaction });
                    this.messageService.showSuccessMessage(response.json().message);
                } else {
                    this.animalsError('Already reacted this way.');
                }

            });
    }

    fetchUserAnimals() {
        this.animalService
            .getUserAnimals()
            .subscribe(response => {
                this.ngRedux.dispatch({ type: AnimalsActions.FETCH_USER_ANIMALS, payload: { animals: response.json() } });
            });
    }

    animalsError(error): void {
        this.ngRedux.dispatch({ type: AnimalsActions.ANIMALS_ERROR, payload: error });
        this.messageService.showErrorMessage(error);
    }
}

// Reducer
export interface IAnimalsState {
    all: Array<Animal>,
    searchResults: Array<Animal>,
    selected: Animal,
    selectedAnimalComments: Array<Comment>,
    currentUserAnimals: Array<Animal>
}

const initialState: IAnimalsState = {
    all: [],
    searchResults: [],
    selected: null,
    selectedAnimalComments: [],
    currentUserAnimals: []
}

export default function reducer(state: IAnimalsState = initialState, action: IAction) {
    switch (action.type) {
        case AnimalsActions.FETCH_ANIMALS:
            return Object.assign({}, state, { all: action.payload.animals })
        case AnimalsActions.FETCH_ANIMAL:
            return Object.assign({}, state, { selected: action.payload.animal })
        case AnimalsActions.FETCH_ANIMAL_COMMENTS:
            return Object.assign({}, state, { selectedAnimalComments: action.payload.comments })
        case AnimalsActions.SEARCH_ANIMALS:
            return Object.assign({}, state, { searchResults: action.payload.animals })
        case AnimalsActions.ANIMAL_ADD_REACTION:
            let updatedAnimal = Object.assign({}, state.selected);
            updatedAnimal['reactions'][action.payload]++;
            return Object.assign({}, state, { selected: updatedAnimal });
        case AnimalsActions.FETCH_USER_ANIMALS:
            return Object.assign({}, state, { currentUserAnimals: action.payload.animals })
        case AnimalsActions.ANIMALS_ERROR:
            return Object.assign({}, state, { error: action.payload.error })
        case AnimalsActions.CREATE_ANIMAL:
        case AnimalsActions.ANIMAL_CREATE_COMMENT:
        case AnimalsActions.REMOVE_ANIMAL:
        default:
            return state;
    }
}



