import { Component, OnInit } from '@angular/core';
import { DogService } from '@app/dogs/services/dog.service';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss'],
})
export class DogListComponent implements OnInit {
  dogList$ = this.dogService.dogList$;

  constructor(private dogService: DogService) {}

  ngOnInit(): void {}
}
