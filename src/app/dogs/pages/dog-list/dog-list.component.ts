import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { DogService } from '@app/dogs/services/dog.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss'],
})
export class DogListComponent implements OnInit, OnDestroy {
  destroy = new Subject();
  dogList$ = this.dogService.dogList$;

  constructor(private route: ActivatedRoute, private dogService: DogService) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy)).subscribe({
      next: (queryParams) => {
        this.handleQueryParams(queryParams);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
  }

  showFavorites() {
    this.dogService.setDogList(this.dogService.getFavoritesList());
  }

  handleQueryParams(params: any) {
    if (params['breed']) {
      this.dogService.getDogList(params['breed']).subscribe();
    }

    if (params['dog']) {
      let dog = JSON.parse(params['dog']);
      this.dogService.setDogList([dog]);
    }

    if (params['show']) {
      if (params['show'] == 'favorites_only') {
        this.showFavorites();
      }
    }
  }
}
