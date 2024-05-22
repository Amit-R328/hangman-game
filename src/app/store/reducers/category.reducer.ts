import { createReducer, on } from '@ngrx/store';
import { selectCategory } from '../actions/category.actions';
import { CategoryState } from '../models/category.model';

export const initialState: CategoryState = {
  selectedCategory: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(selectCategory, (state, { category }) => ({ ...state, selectedCategory: category }))
);
