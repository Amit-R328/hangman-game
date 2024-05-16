import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  constructor(private router: Router) { }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if(e.key === "Enter") this.onPlay();
    else if(e.key === "Tab") this.openHowToPlay();
  }

  openHowToPlay () {
    this.router.navigate(['/rules']);
  }

  onPlay () {
    this.router.navigate(['/categories']);
  }
}
