import {Component} from '@angular/core'
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(public gameService:GameService) {

  }

  ngOnInit() {
  }

  playerClick(index: number){
     this.gameService.handlerPlayerClick(index)
  }

}
