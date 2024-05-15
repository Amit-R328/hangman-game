import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openHowToPlay () {
    console.log('here');
    this.router.navigate(['/rules']);
  }

  onPlay () {
    this.router.navigate(['/categories']);
  }
}
