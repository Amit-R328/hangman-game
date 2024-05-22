import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameComponent } from './game/game.component';
import { PauseMenuComponent } from './pause-menu/pause-menu.component';
import { CategoryComponent } from './category/category.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    GameComponent,
    PauseMenuComponent,
    CategoryComponent,
    HowToPlayComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
