import { createAction, props } from '@ngrx/store';

export const loadCategories = createAction('[Category] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{ categories: { [key: string]: { name: string; selected: boolean }[] } }>()
);

export const loadCategoriesFailure = createAction(
  '[Category] Load Categories Failure',
  props<{ error: any }>()
);

export const selectCategory = createAction(
  '[Category] Select',
  props<{ category: string }>()
);

export const updateSelectedStatus = createAction(
  '[Category] update selected status',
  props<{ category: string, itemName: string, selected: boolean }>()
);
