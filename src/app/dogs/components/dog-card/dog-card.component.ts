import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent implements OnInit {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  liked: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
