import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from "./components/game/game.component";
import { TableWinnersComponent } from './components/table-winners/table-winners.component';

import {GameService} from "./services/game.service";
import { AlertComponent } from './components/alert/alert.component';
import { TimerComponent } from './components/timer/timer.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    TableWinnersComponent,
    AlertComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
