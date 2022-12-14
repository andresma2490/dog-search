import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { DogCardComponent } from './dog-card/dog-card.component';
import { DogSearchComponent } from './dog-search/dog-search.component';

@NgModule({
  declarations: [DogCardComponent, DogSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  exports: [DogCardComponent, DogSearchComponent],
})
export class DogComponentsModule {}
