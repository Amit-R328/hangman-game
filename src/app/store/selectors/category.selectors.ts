import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoryState } from '../models/category.model';

export const selectCategoryState = createFeatureSelector<CategoryState>('category');

export const getSelectedCategory = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.selectedCategory
);
