import { Component, HostListener, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getSelectedCategory, selectAllCategories } from '../store/selectors/category.selectors';
import { loadCategories, selectCategory } from '../store/actions/category.actions';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryState } from '../store/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit{
  categories$: Observable<{ [key: string]: { name: string; selected: boolean }[] }>;
  categories: string[] = [];
  selectedCategory$: Observable<string | null>;
  focusedCategoryIndex: number | undefined;
  subscriptions: Subscription[] = [];
  isComponentActive: boolean = false;

  constructor(private store: Store<CategoryState>,
    private readonly location: Location,
    private router: Router
  ) {
    this.categories$ = this.store.select(selectAllCategories)
    this.selectedCategory$ = this.store.pipe(select(getSelectedCategory));
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    const sub = this.categories$.subscribe(categories => {
      this.categories = Object.keys(categories);
    });
    this.subscriptions.push(sub);
  }

  ngAfterViewInit(): void {
    this.isComponentActive = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.isComponentActive = false;
  }

  focusPreviousCategory() {
    if (this.focusedCategoryIndex && this.focusedCategoryIndex > 0) {
      this.focusedCategoryIndex--;
      this.setFocusOnCategory(this.focusedCategoryIndex);
    }
  }

  focusNextCategory() {
    if(this.focusedCategoryIndex === undefined) {
      this.focusedCategoryIndex = 0;
      this.setFocusOnCategory(this.focusedCategoryIndex);
    }else if (this.focusedCategoryIndex < this.categories.length - 1) {
      this.focusedCategoryIndex++;
      this.setFocusOnCategory(this.focusedCategoryIndex);
    }
  }

  setFocusOnCategory(index: number) {
    const categoryElements = document.querySelectorAll('.category');
    if (categoryElements[index]) {
      console.log(categoryElements[index]);
      (categoryElements[index] as HTMLDivElement).focus();
    }
  }

  onSelectCategory(index: number) {
    const selectedCategory = this.categories[index];
    this.store.dispatch(selectCategory({ category: selectedCategory }));
    this.router.navigate(['/game']);
  }

  onBack() {
    this.location.back();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (!this.isComponentActive) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        this.focusPreviousCategory();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        this.focusNextCategory();
        break;
      case 'Enter':
        this.focusedCategoryIndex !== undefined ? this.onSelectCategory(this.focusedCategoryIndex) : null;
        break;
      case 'Escape':
        this.onBack();
        e.preventDefault();
        break;
    }
  }
}