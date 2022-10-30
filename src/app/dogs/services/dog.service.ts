import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, forkJoin, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { DogListDTO, BreedListDTO } from '../models/dogs';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private dogList = new BehaviorSubject<any[]>([]);
  dogList$ = this.dogList.asObservable();

  constructor(private http: HttpClient) {}

  getDogListAutoComplete() {
    return this.http
      .get<DogListDTO>(`${environment.API_URL}/breeds/list/all`)
      .pipe(map((res) => res.message));
  }

  getDogList(breed: string) {
    this.dogList.next([]);
    return this.http
      .get<BreedListDTO>(`${environment.API_URL}/breed/${breed}/list`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 404) {
            return throwError(() => 'not found');
          }
          return throwError(() => error);
        }),
        map((res) =>
          res.message.length == 0
            ? [`${breed}`]
            : res.message.map((subBreed) => `${breed}/${subBreed}`)
        ),
        switchMap((obs) => this.getDogImages(obs))
      );
  }

  getDogImage(breed: string) {
    return this.http.get<BreedListDTO>(
      `${environment.API_URL}/breed/${breed}/images`
    );
  }

  getDogImages(breeds: string[]) {
    return forkJoin(
      breeds.map((breed) => {
        return this.getDogImage(breed).pipe(
          map((res) => {
            return {
              breed: breed,
              images: res.message.slice(0, 8),
            };
          }),
          tap((dog) => this.dogList.next([...this.dogList.value, dog]))
        );
      })
    );
  }
}
