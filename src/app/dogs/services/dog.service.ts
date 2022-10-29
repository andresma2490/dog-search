import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private dogList = new BehaviorSubject([]);
  dogList$ = this.dogList.asObservable();

  constructor(private http: HttpClient) {}

  getDogList(breed: string | null = null) {
    return this.http
      .get(
        `${environment.API_URL}/${
          breed ? `breed/${breed}/list` : 'breeds/list/all'
        }`
      )
      .pipe(
        map((res: any) => res.message),
        tap((list) => this.dogList.next(list))
      );
  }
}
