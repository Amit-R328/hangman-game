
import { Component, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { categoryReducer } from '../store/reducers/category.reducer';
import { getSelectedCategory } from '../store/selectors/category.selectors';
import { selectCategory } from '../store/actions/category.actions';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  selectedCategory$: Observable<string | null>;
  totalLives: number = 8;
  remianingLives: number = this.totalLives;

  constructor(private store: Store<{ 
    category: typeof categoryReducer }>,
    private readonly location: Location,
    private router: Router
  ) {
    this.selectedCategory$ = this.store.pipe(select(getSelectedCategory));
   }

  ngOnInit(): void {
  }

  get livesPercentage() {
    return (this.remianingLives / this.totalLives) * 100;
  }

  onWrongGuess() {
    if (this.remianingLives > 0) {
      this.remianingLives--;
    }
  }

}
