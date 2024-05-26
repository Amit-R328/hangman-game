import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoryState } from '../models/category.model';

export const selectCategoryState = createFeatureSelector<CategoryState>('category');

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories
);

export const getSelectedCategory = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.selectedCategory
);
