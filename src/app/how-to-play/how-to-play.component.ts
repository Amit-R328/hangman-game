import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.scss']
})
export class HowToPlayComponent {

  constructor(
    private readonly location: Location
  ) {}

  onBack() {
    this.location.back();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if(e.key === "Escape") this.location.back();
    else return;
  }

}
