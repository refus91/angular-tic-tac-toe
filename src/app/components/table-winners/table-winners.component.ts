import { Component } from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-table-winners',
  templateUrl: './table-winners.component.html',
  styleUrls: ['./table-winners.component.scss']
})
export class TableWinnersComponent {
  constructor(public gameService:GameService) {
  }
}
