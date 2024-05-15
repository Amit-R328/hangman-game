import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameComponent } from './game/game.component';
import { CategoryComponent } from './category/category.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';

// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'rules', component: HowToPlayComponent},
  { path: 'game', component: GameComponent },
  { path: 'categories', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
