import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { categoryReducer } from '../store/reducers/category.reducer';
import { getSelectedCategory } from '../store/selectors/category.selectors';
import { selectCategory } from '../store/actions/category.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories = ['Movies', 'TV Shows', 'Countries', 'Capital Cities', 'Animals', 'Sports'];
  selectedCategory$: Observable<string | null>;
  
  constructor(private store: Store<{ 
    category: typeof categoryReducer }>,
    private readonly location: Location
  ) {
    this.selectedCategory$ = this.store.pipe(select(getSelectedCategory));
   }

  ngOnInit(): void {
    this.selectedCategory$.subscribe(category => {
      console.log('Selected Category:', category);
    });
  }

  onSelectCategory(category: string) {
    this.store.dispatch(selectCategory({ category }));
  }

  onBack() {
    this.location.back();
  }
}