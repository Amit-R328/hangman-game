
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription,} from 'rxjs';
import { take } from 'rxjs/operators';
import { categoryReducer } from '../store/reducers/category.reducer';
import { getSelectedCategory, selectAllCategories } from '../store/selectors/category.selectors';
import { loadCategories, updateSelectedStatus } from '../store/actions/category.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  categories$: Observable<{ [key: string]: { name: string; selected: boolean }[] }>;
  selectedCategory$: Observable<string | null>;
  alphabet: string[];
  currentWord: string = '';
  displayedWord: (string | null)[][] = [];
  pickedLetters: string[] = [];
  totalLives: number = 8;
  remianingLives: number = this.totalLives;
  subscriptions: Subscription[] = [];
  isPaused: boolean = false;
  isLose: boolean = false;
  isWin: boolean = false;
  menuType: 'paused' | 'lose' | 'win'  = 'paused';

  constructor(private store: Store<{ 
    category: typeof categoryReducer }>,
    private router: Router
  ) {
    this.categories$ = this.store.select(selectAllCategories);
    this.selectedCategory$ = this.store.pipe(select(getSelectedCategory));
    this.alphabet = this.generateAlphabet();
   }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    const sub = this.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectWord(category);
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  generateAlphabet(): string[] {
    return Array.from(Array(26)).map((_, index) => String.fromCharCode(65 + index));
  }

  selectWord(category: string): void {
    this.categories$.pipe(take(1)).subscribe((categories) => {
      const categoryData = categories as { [key: string]: { name: string; selected: boolean }[] };
      const items = categoryData[category].filter(item => !item.selected);
      if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const selectedItem = items[randomIndex];
        this.currentWord = selectedItem.name.toUpperCase();
        this.displayedWord = this.currentWord.split(' ').map(word => Array(word.length).fill('_'));

        // Dispatch action to update selected status
        this.store.dispatch(updateSelectedStatus({ category, itemName: selectedItem.name, selected: true }));
      } else {
        console.log(`No more items in category ${category}`);
      }
    });
  }

  initializeDisplayedWord(): void {
    this.displayedWord = this.currentWord.split(' ').map(word => Array(word.length).fill('_'));
  }

  get livesPercentage() {
    return (this.remianingLives / this.totalLives) * 100;
  }

  onGuess(letter: string): void {
    this.pickedLetters.push(letter);
    let corrctGuess = false;
    this.currentWord.split(' ').forEach((word, wordIndex) => {
      word.split('').forEach((char, charIndex) => {
        if (char === letter) {
          this.displayedWord[wordIndex][charIndex] = char;
          corrctGuess = true;
        }
      })
    });
    if (!corrctGuess) this.onWrongGuess();
  }

  onWrongGuess() {
    if (this.remianingLives > 0) {
      this.remianingLives--;
    }
  }

  checkGameStatus(): void {
    const isWin = this.displayedWord.every(word => word.every(char => char !== '_'));
    if (isWin) {
      this.onWin();
    }
  }

  onWin(): void {
    this.isWin = true;
    this.menuType = 'win';
  }

  onLose(): void {
    this.isLose = true;
    this.menuType = 'lose';
  }

  paueGame(): void {
    this.isPaused = true;
    this.menuType = 'paused';
  }

  onContinueGame(): void {
    this.isPaused = false;
  }

  onPlayAgain(): void {
    this.resetGame();
  }

  onNewCategory(): void {
    this.resetGame();
    this.router.navigate(['/category']);
  }

  onQuitGame(): void {
    this.router.navigate(['/main-menu']);
  }

  resetGame(): void {
    this.currentWord = '';
    this.displayedWord = [];
    this.pickedLetters = [];
    this.remianingLives = this.totalLives;
    this.isPaused = false;
    this.isLose = false;
    this.isWin = false;
    this.menuType = 'paused';
  }

}

