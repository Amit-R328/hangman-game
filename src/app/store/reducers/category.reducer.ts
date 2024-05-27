import { createReducer, on } from '@ngrx/store';
import { CategoryState } from '../models/category.model';
import * as CategoryActions from '../actions/category.actions';

export const initialState: CategoryState = {
  categories: {},
  selectedCategory: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories })),
  on(CategoryActions.selectCategory, (state, { category }) => ({ ...state, selectedCategory: category })),
  on(CategoryActions.updateSelectedStatus, (state, { category, itemName, selected }) => {
    const updatedCategories = { ...state.categories };
    const categoryItems = updatedCategories[category].map(item => 
      item.name === itemName ? { ...item, selected } : item
    );
    updatedCategories[category] = categoryItems;
    return { ...state, categories: updatedCategories };
  })
);
