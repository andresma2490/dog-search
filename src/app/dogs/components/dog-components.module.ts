import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { DogCardComponent } from './dog-card/dog-card.component';

@NgModule({
  declarations: [DogCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [DogCardComponent],
})
export class DogComponentsModule {}
