
import { Component, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { categoryReducer } from '../store/reducers/category.reducer';
import { getSelectedCategory, selectAllCategories } from '../store/selectors/category.selectors';
import { loadCategories, selectCategory } from '../store/actions/category.actions';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  categories$: Observable<{ [key: string]: { name: string; selected: boolean }[] }>;
  selectedCategory$: Observable<string | null>;
  alphabet: string[];
  currentWord: string = '';
  displayedWord: string[] = [];
  totalLives: number = 8;
  remianingLives: number = this.totalLives;

  constructor(private store: Store<{ 
    category: typeof categoryReducer }>,
    private readonly location: Location,
    private router: Router
  ) {
    this.categories$ = this.store.select(selectAllCategories);
    this.selectedCategory$ = this.store.pipe(select(getSelectedCategory));
    this.alphabet = this.generateAlphabet();
   }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectWord(category);
      }
    });
  }

  generateAlphabet(): string[] {
    return Array.from(Array(26)).map((_, index) => String.fromCharCode(65 + index));
  }

  selectWord(category: string): void {
    this.categories$.subscribe(categories => {
      const items = categories[category];
      if (items) {
        const randomIndex = Math.floor(Math.random() * items.length);
        this.currentWord = items[randomIndex].name.toUpperCase();
        this.displayedWord = Array(this.currentWord.length).fill('_');
      }
    });
  }

  get livesPercentage() {
    return (this.remianingLives / this.totalLives) * 100;
  }

  onGuess(letter: string): void {
    if (this.currentWord.includes(letter)) {
      this.onCorrectGuess(letter);
    } else {
      this.onWrongGuess();
    }
  }

  onCorrectGuess(letter: string): void {
    this.currentWord.split('').forEach((char, index) => {
      if (char === letter) {
        this.displayedWord[index] = letter;
      }
    });
  }

  onWrongGuess() {
    if (this.remianingLives > 0) {
      this.remianingLives--;
    }
  }

}
