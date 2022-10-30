import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Dog } from '@app/dogs/models/dogs';
import { DogService } from '@app/dogs/services/dog.service';
declare var window: any;

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent implements OnInit {
  @Input() dog!: Dog;
  liked: boolean = false;

  constructor(private _snackBar: MatSnackBar, private dogService: DogService) {}

  ngOnInit(): void {}

  like() {
    if (!this.liked) {
      this.dogService.addToFavorites(this.dog);
      this.liked = true;
    }
  }

  shareDog() {
    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.origin;

    navigator.clipboard.writeText(
      `${baseUrl}/dogs?dog=${JSON.stringify(this.dog)}`
    );
    this._snackBar.open('Link copied', 'Ok', {
      duration: 3000,
    });
  }
}
