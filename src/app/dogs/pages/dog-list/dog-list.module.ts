import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogListRoutingModule } from './dog-list-routing.module';
import { DogListComponent } from './dog-list.component';
import { DogComponentsModule } from '../../components/dog-components.module';

@NgModule({
  declarations: [DogListComponent],
  imports: [CommonModule, DogListRoutingModule, DogComponentsModule],
})
export class DogListModule {}
