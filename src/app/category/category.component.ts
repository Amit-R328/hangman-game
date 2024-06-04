import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
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
export class CategoryComponent implements OnInit, OnDestroy{
  categories$: Observable<{ [key: string]: { name: string; selected: boolean }[] }>;
  categories: string[] = [];
  selectedCategory$: Observable<string | null>;
  focusedCategoryIndex: number = 0;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<CategoryState>,
    private readonly location: Location,
    private router: Router
  ) {
    this.categories$ = this.store.select(selectAllCategories)
    this.selectedCategory$ = this.store.pipe(select(getSelectedCategory));
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.setFocusOnCategory(this.focusedCategoryIndex);
    const sub = this.categories$.subscribe(categories => {
      this.categories = Object.keys(categories);
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  focusPreviousCategory() {
    if (this.focusedCategoryIndex > 0) {
      this.focusedCategoryIndex--;
      this.setFocusOnCategory(this.focusedCategoryIndex);
    }
  }

  focusNextCategory() {
    if (this.focusedCategoryIndex < this.categories.length - 1) {
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
        this.onSelectCategory(this.focusedCategoryIndex);
        break;
      case 'Escape':
        this.onBack();
        e.preventDefault();
        break;
    }
  }
}