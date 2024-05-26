import { Injectable } from "@angular/core"; 
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { CategoryService } from "../../category.service";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as CategoryActions from "../actions/category.actions";

@Injectable()
export class CategoryEffects {

    constructor(private actions$: Actions, private categoryService: CategoryService) {}

    loadCategories$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CategoryActions.loadCategories),
            mergeMap(() => 
                this.categoryService.getCategories().pipe(
                    map(data => {
                        const categories = Object.keys(data.categories); 
                        return CategoryActions.loadCategoriesSuccess({ categories });
                    }),
                    catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
                )
            )
        )
    )
}
