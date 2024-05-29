import { Component, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class CategoryComponent implements OnInit {
  categories$: Observable<{ [key: string]: { name: string; selected: boolean }[] }>;
  selectedCategory$: Observable<string | null>;
  
  constructor(private store: Store<CategoryState>,
    private readonly location: Location,
    private router: Router
  ) {
    this.categories$ = this.store.select(selectAllCategories)
    this.selectedCategory$ = this.store.pipe(select(getSelectedCategory));
   }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
  }

  onSelectCategory(category: string) {
    this.store.dispatch(selectCategory({ category }));
    this.router.navigate(['/game']);
  }

  onBack() {
    this.location.back();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if(e.key === "Escape") this.onBack();
    e.preventDefault(); //Prevent the default action of the Escape key
  }
}