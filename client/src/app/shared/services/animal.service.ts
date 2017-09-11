import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { RequesterService } from './requester.service'

import { Animal } from '../../animals/Animal';
import { baseUrl } from '../api';

@Injectable()
export class AnimalService {
    private animalsUrl = `${baseUrl}/animals`;

    constructor(
        private http: Http,
        private requester: RequesterService
    ) { }

    getAnimals(page = 1): Promise<Animal[]> {
        return this.http.get(`${this.animalsUrl}/all?page=${page}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getAnimal(id: string): Promise<Animal> {
        const url = `${this.animalsUrl}/details/${id}`;

        return this.requester.get(url, true)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    create(animal) {
        return this.requester.post(this.animalsUrl + '/create', animal, true);
    }

    delete(animalId) {
        return this.requester.post(`${this.animalsUrl}/delete/${animalId}`, {}, true);
    }

    search(searchStr: string, page: number = 1): Promise<Animal[]> {
        return this.http.get(`${this.animalsUrl}/all?search=${searchStr}&page=${page}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    addReaction(animalId, reaction) {
        const url = `${this.animalsUrl}/details/${animalId}/reaction`;

        return this.requester.post(url, {type: reaction}, true);
    }

    addComment(animalId, comment) {
        const url = `${this.animalsUrl}/details/${animalId}/comments/create`;

        return this.requester.post(url, {message: comment}, true);
    }

    getAnimalComments(animalId) {
        const url = `${this.animalsUrl}/details/${animalId}/comments`;

        return this.requester.get(url, true);
    }

    getUserAnimals() {
        const url = `${this.animalsUrl}/mine`;

        return this.requester.get(url, true);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}