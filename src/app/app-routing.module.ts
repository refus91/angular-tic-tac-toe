import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {BoardComponent} from "./components/board/board.component";
import {GameComponent} from "./components/game/game.component";
import {TableWinnersComponent} from "./components/table-winners/table-winners.component";

const routes: Routes =[
  { path: '',
    component: GameComponent,
    children: [
      {
        path: 'board', component: BoardComponent
      },
      { path: 'winner-table', component: TableWinnersComponent},
    ]
  },
  { path: '**', component: GameComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
