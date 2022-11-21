import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],

})
export class GameComponent {
  title = 'Крестики нолики'

  constructor(private titleService:Title, public gameService:GameService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
