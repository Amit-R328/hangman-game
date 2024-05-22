import { ActionReducerMap } from '@ngrx/store';
import { categoryReducer } from './category.reducer';
import { AppState } from '../app.state';

export const reducers: ActionReducerMap<AppState> = {
  category: categoryReducer
};


