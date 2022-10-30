import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

import { DogService } from '@app/dogs/services/dog.service';
import { DogList } from '@app/dogs/models/dogs';

@Component({
  selector: 'app-dog-search',
  templateUrl: './dog-search.component.html',
  styleUrls: ['./dog-search.component.scss'],
})
export class DogSearchComponent implements OnInit {
  control = new FormControl<string>('', { nonNullable: true });
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.dogService.getDogListAutoComplete().subscribe({
      next: (dogList: DogList) => {
        this.options = Object.keys(dogList);
        this.filteredOptions = this.control.valueChanges.pipe(
          debounceTime(300),
          startWith(''),
          map((value) => this._filter(value || ''))
        );
      },
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  search(event?: Event) {
    event?.preventDefault();
    this.dogService.getDogList(this.control.value).subscribe();
  }
}
